﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using EcommerceAPI.Models;
using MongoDB.Bson;

namespace EcommerceAPI.Controllers
{

    public class ProductUpdateRequest
    {
        public string Id { get; set; }
        public string Band { get; set; }
        public string Name { get; set; }
        public List<string> Tracklist { get; set; }
        public string URL { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public int Amount { get; set; }
    }

    public class PurchaseRequest
    {
        public List<string> ProductIds { get; set; }
        public string UserId { get; set; }
    }
    public class UserRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int UserType { get; set; } = 0;
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
    public class ReviewRequest
    {
        public string ProductId { get; set; }
        public string UserId { get; set; }
        public string Comments { get; set; }
        public double Rating { get; set; }
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
                email: request.Email,
                userType: request.UserType
                );

            var db = new MongoClient("mongodb://localhost:27017");
            var database = db.GetDatabase("Ecommerce");
            var clients = database.GetCollection<User>("users");

            clients.InsertOne(client);

                return Ok(new {messsage = "User " + request.Name + " was successfully added" }); 
            }
            catch (Exception)
            {
                return "Could not complete task";
            }
        }

        [HttpPost]
        [Route("purchaseAlbums")]
        public IActionResult PurchaseAlbums([FromBody] PurchaseRequest request)
        {
            var db = new MongoClient("mongodb://localhost:27017");
            var database = db.GetDatabase("Ecommerce");

            var products = database.GetCollection<Product>("products");
            var users = database.GetCollection<User>("users");

            var userFilter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(request.UserId));
            var user = users.Find(userFilter).FirstOrDefault();

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var purchasedProducts = new List<string>();
            var notFoundProducts = new List<string>();
            var insufficientStockProducts = new List<string>();

            foreach (var productId in request.ProductIds)
            {
                var productFilter = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(productId));
                var product = products.Find(productFilter).FirstOrDefault();

                if (product == null)
                {
                    notFoundProducts.Add(productId);
                    continue;
                }

                if (product.Amount <= 0)
                {
                    insufficientStockProducts.Add(productId);
                    continue;
                }

                // Update the amount of the product
                var updateAmount = Builders<Product>.Update.Inc("amount", -1);
                products.UpdateOne(productFilter, updateAmount);

                // Add the product to the user's purchased array
                var updateUser = Builders<User>.Update.Push("purchased", productId);
                users.UpdateOne(userFilter, updateUser);

                purchasedProducts.Add(productId);
            }

            return Ok(new
            {
                message = "Purchase process completed",
                purchasedProducts = purchasedProducts,
                notFoundProducts = notFoundProducts,
                insufficientStockProducts = insufficientStockProducts
            });
        }

        [HttpDelete]
        [Route("deleteUser")]
        public dynamic DeleteClient(string id)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                
                var database = db.GetDatabase("Ecommerce");
                
                var clients = database.GetCollection<User>("users");
                
                clients.DeleteOne(a => a.Id == id);
                
                return "user was succesfully deleted";

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
        public IActionResult AddReview([FromBody] ReviewRequest request)
        {
            var newReview = new Review(request.Rating, request.Comments, request.UserId);

            var db = new MongoClient("mongodb://localhost:27017");

            var database = db.GetDatabase("Ecommerce");

            var products = database.GetCollection<Product>("products");

            var filter = Builders<Product>.Filter.And(
                Builders<Product>.Filter.Eq("_id", ObjectId.Parse(request.ProductId)),
                Builders<Product>.Filter.ElemMatch(product => product.Reviews, review => review.UserID == request.UserId)
            );

            var update = Builders<Product>.Update.Set("reviews.$.rating", request.Rating)
                                                 .Set("reviews.$.comments", request.Comments);

            var result = products.FindOneAndUpdate(filter, update);

            if (result == null)
            {
                // If the user's review doesn't exist, add a new review
                var filterById = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(request.ProductId));
                var updateById = Builders<Product>.Update.Push("reviews", newReview);
                products.UpdateOne(filterById, updateById);
                return Ok(new { message = "New review added", review = newReview });
            }
            else
            {
                // If the user's review exists, update it
                return Ok(new { message = "Review updated", review = newReview });
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
        public dynamic DeleteProduct([FromBody] dynamic data)
        {
            try
            {
                string id = data.id.ToString();
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



        [HttpPatch]
        [Route("updateProduct")]
        public IActionResult UpdateProduct([FromBody] ProductUpdateRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Id))
            {
                return BadRequest("Invalid request data");
            }

            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                var database = db.GetDatabase("Ecommerce");
                var products = database.GetCollection<Product>("products");

                var filter = Builders<Product>.Filter.Eq(p => p.Id, request.Id);
                var updateDefinition = new List<UpdateDefinition<Product>>();

                if (request.Band != null)
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Band, request.Band));
                }
                if (request.Name != null)
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Name, request.Name));
                }
                if (request.Tracklist != null)
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Tracklist, request.Tracklist));
                }
                if (request.URL != null)
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.PhotoURL, request.URL));
                }
                if (request.Price != default(double))
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Price, request.Price));
                }
                if (request.Category != null)
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Category, new List<string> { request.Category }));
                }
                if (request.Amount != default(int))
                {
                    updateDefinition.Add(Builders<Product>.Update.Set(p => p.Amount, request.Amount));
                }

                if (updateDefinition.Count == 0)
                {
                    return BadRequest("No fields to update");
                }

                var update = Builders<Product>.Update.Combine(updateDefinition);

                // Log the filter and update definitions
                Console.WriteLine($"Filter: {filter}");
                Console.WriteLine($"Update: {update}");

                var result = products.UpdateOne(filter, update);

                if (result.ModifiedCount > 0)
                {
                    return Ok(new { message = "Product was successfully updated", product = request });
                }
                else
                {
                    return NotFound("Product not found or no changes made");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

}

/*cambiar clases y parametros en ruta productos*/ 

/*
 TO DO:
    -metodo get para recuperar productos en base a su categoría
 */