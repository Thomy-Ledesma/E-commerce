using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceAPI.Models
{
    public class Product
    {
        public Product(string band, string name,List<string> tracklist, string photoURL, List<string> category, double price, int amount)
        {
            Name = name;
            Band = band;
            Tracklist = tracklist;
            Reviews = [];
            PhotoURL = photoURL;
            Category = category;
            Price = price;
            Amount = amount;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("band")]
        public string Band { get; set; }

        [BsonElement("tracklist")]
        public List<string> Tracklist { get; set; }
        
        [BsonElement("reviews")]
        public List<Review> Reviews { get; set; }
        
        [BsonElement("photoURL")]
        public string PhotoURL { get; set; }
        
        [BsonElement("category")]
        public List<string> Category { get; set; }

        [BsonElement("price")]
        public double Price { get; set; }

        [BsonElement("amount")]
        public int Amount { get; set; }
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
