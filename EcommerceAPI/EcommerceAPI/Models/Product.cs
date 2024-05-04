using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceAPI.Models
{
    public class Product
    {
        public Product(string description, string name, string photoURL, List<string> category, double price)
        {
            Name = name;
            Description = description;
            Reviews = [];
            PhotoURL = photoURL;
            Category = category;
            Price = price;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("description")]
        public string Description { get; set; }
        
        [BsonElement("reviews")]
        public List<Review> Reviews { get; set; }
        
        [BsonElement("photoURL")]
        public string PhotoURL { get; set; }
        
        [BsonElement("category")]
        public List<string> Category { get; set; }

        [BsonElement("price")]
        public double Price { get; set; }
    }

    public class Review
    {
        public Review(double rating, string comments, string userID)
        {
            Rating = rating;

            Comments = comments;

            UserID = userID;
        }

        [BsonElement("rating")]
        public double Rating { get; set; }

        [BsonElement("comments")]
        public string Comments { get; set; }

        [BsonElement("userID")]
        public string UserID { get; set; }  
    }
}
