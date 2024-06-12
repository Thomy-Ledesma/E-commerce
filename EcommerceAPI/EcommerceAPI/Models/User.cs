using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceAPI.Models
{
    public class User
    {
        public User(string password, string name, string email)
        {
            Email = email;
            Name = name;
            Password = password;
            Wishlist = [];
            Cart = [];
            Purchased = [];
            UserType = 0;
        }
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("email")]
        public string Email { get; set;  }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("wishlist")]
        public List<string> Wishlist { get; set; }

        [BsonElement("cart")]
        public List<string> Cart { get; set; }

        [BsonElement("purchased")]
        public List<string> Purchased { get; set; }

        [BsonElement("userType")]
        public int UserType { get; set; }
    }
}
