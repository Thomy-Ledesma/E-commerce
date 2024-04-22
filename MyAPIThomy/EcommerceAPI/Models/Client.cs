using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceAPI.Models
{
    public class Client
    {
        public Client(  string age, string name)
        {
            Name = name;
            Age = age;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("age")]
        public string Age { get; set; }
    }
}
