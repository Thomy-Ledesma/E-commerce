using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using EcommerceAPI.Models;
using MongoDB.Bson;

namespace EcommerceAPI.Controllers
{
    public class UserRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
    public class ProductRequest
    {
        public string Name { get; set; }
        public string Band { get; set; }
        public List<string> Tracklist { get; set; }
        public string URL { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public int Amount { get; set; }
    }
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("listUsers")]
        public dynamic ListUsers()
        {
            var db = new MongoClient("mongodb://localhost:27017");
            
            var database = db.GetDatabase("Ecommerce");
            
            var clients = database.GetCollection<User>("users");
            
            List<User> lst = clients.Find(d => true).ToList();
            
            return lst;
        }
        [HttpGet]
        [Route("login")]

        public dynamic Login(string userEmail, string userPass)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");

                var database = db.GetDatabase("Ecommerce");

                var users = database.GetCollection<User>("users");

                var user = users.Find(user => (user.Email == userEmail || user.Name == userEmail) && user.Password == userPass).FirstOrDefault();

                return user;
            }
            catch (Exception) {
                return "user not found";
            }
        }

        [HttpPost]
        [Route("addUser")]
        public dynamic AddUser([FromBody] UserRequest request)
        {
            try
            {
                var client = new User(
                password: request.Password,
                name: request.Name,
                email: request.Email
                );

            var db = new MongoClient("mongodb://localhost:27017");
            var database = db.GetDatabase("Ecommerce");
            var clients = database.GetCollection<User>("users");

            clients.InsertOne(client);

                return Ok("User " + request.Name + " was successfully added"); 
            }
            catch (Exception)
            {
                return "Could not complete task";
            }
        }

            

        [HttpDelete]
        [Route("deleteUser")]
        public dynamic DeleteClient(string name, string id)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                
                var database = db.GetDatabase("Ecommerce");
                
                var clients = database.GetCollection<User>("users");
                
                clients.DeleteOne(a => a.Id == id && a.Name == name);
                
                return "user " + name + " was succesfully deleted";

            }
            catch (Exception)
            {
                return "user not found";
            }
        }
    }

    [Route("products")]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        [Route("listProducts")]
        public dynamic ListProducts()
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                var database = db.GetDatabase("Ecommerce");
                var products = database.GetCollection<Product>("products");
                List<Product> lst = products.Find(d => true).ToList();
                return lst;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine("Error: " + ex.Message);
                // Return an appropriate error response
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet]
        [Route("GetAlbum")]
        public dynamic GetAlbum(string id)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                var database = db.GetDatabase("Ecommerce");
                var products = database.GetCollection<Product>("products");
                List<Product> album = products.Find(album => album.Id == id).ToList();
                return album;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine("Error: " + ex.Message);
                // Return an appropriate error response
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpPost]
        [Route("addProduct")]
        public dynamic AddProduct([FromBody] ProductRequest request)
        {
            var product = new Product(
                band: request.Band,
                name: request.Name,
                tracklist: request.Tracklist,
                photoURL: request.URL,
                price: request.Price,
                category: new List<string> { request.Category },
                amount: request.Amount
            );

            var db = new MongoClient("mongodb://localhost:27017");

            var database = db.GetDatabase("Ecommerce");

            var products = database.GetCollection<Product>("products");

            products.InsertOne(product);

            return request.Name + " was successfully added";
        }

        [HttpPost]
        [Route("addReview")]
        public dynamic AddReview(string productId, string userId, string comments, double rating)
        {   
            var newReview = new Review(rating, comments, userId);

            var db = new MongoClient("mongodb://localhost:27017");

            var database = db.GetDatabase("Ecommerce");

            var products = database.GetCollection<Product>("products");

            var filter = Builders<Product>.Filter.And(
                Builders<Product>.Filter.Eq("_id", ObjectId.Parse(productId)),
                Builders<Product>.Filter.ElemMatch(product => product.Reviews, review => review.UserID == userId)
            );

            var update = Builders<Product>.Update.Set("reviews.$.rating", rating)
                                         .Set("reviews.$.comments", comments);

            var result = products.FindOneAndUpdate(filter, update);

            if (result == null)
            {
                // If the user's review doesn't exist, add a new review
                var filterById = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(productId));
                var updateById = Builders<Product>.Update.Push("reviews", newReview);
                products.UpdateOne(filterById, updateById);
                return "New review added: \n" + newReview.ToJson();
            }
            else
            {
                // If the user's review exists, update it
                return "Existing review updated: \n" + newReview.ToJson();
            }
        }
        
        [HttpPost]
        [Route("addCategory")]
        public dynamic AddCategory(string id, string category)
        {

            var db = new MongoClient("mongodb://localhost:27017");

            var database = db.GetDatabase("Ecommerce");

            var products = database.GetCollection<Product>("products");

            var filter = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(id));

            var update = Builders<Product>.Update.Push("category", category);

            var updateResult = products.UpdateOne(filter, update);

            if (updateResult.IsAcknowledged && updateResult.ModifiedCount > 0)
            {
                return ("String added to the array successfully.");
            }
            else
            {
                return ("Failed to add string to the array.");
            }
        }



        [HttpDelete]
        [Route("deleteProduct")]
        public dynamic DeleteProduct(string id)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");

                var database = db.GetDatabase("Ecommerce");
                
                var products = database.GetCollection<Product>("products");
                
                products.DeleteOne(a => a.Id == id);
                    
                return "Product deleted!";

            }
            catch (Exception)
            {
                return "Product not found";
            }
        }
    }
}

/*cambiar clases y parametros en ruta productos*/ 

/*
 TO DO:
    -metodo get para recuperar productos en base a su categoría
 */