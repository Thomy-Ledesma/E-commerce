using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MyAPIThomy.Models;

namespace MyAPIThomy.Controllers
{
    [ApiController]
    [Route("clients")]
    public class ClientController : ControllerBase
    {
        [HttpGet]
        [Route("listUsers")]
        public dynamic ListClient()
        {
            var db = new MongoClient("mongodb://localhost:27017");
            var database = db.GetDatabase("apiUsers");
            var clients = database.GetCollection<Client>("users");
            List<Client> lst = clients.Find(d => true).ToList();
            return lst;
        }

        [HttpPost]
        [Route("saveNewUser")]
        public dynamic saveClient(string name, string age)
        {
            var client = new Client(age: age, name:name);
            var db = new MongoClient("mongodb://localhost:27017");
            var database = db.GetDatabase("apiUsers");
            var clients = database.GetCollection<Client>("users");
            clients.InsertOne(client);
            return "user " + name + " was succesfully added";
        }

        [HttpDelete]
        [Route("deleteUser")]
        public dynamic deleteClient(string name, string id)
        {
            try
            {
                var db = new MongoClient("mongodb://localhost:27017");
                var database = db.GetDatabase("apiUsers");
                var clients = database.GetCollection<Client>("users");
                clients.DeleteOne(a => a.Id == id && a.Name == name);
                return "user " + name + " was succesfully deleted";

            }
            catch (Exception)
            {
                return "user not found";
            }
        }
    }
}
