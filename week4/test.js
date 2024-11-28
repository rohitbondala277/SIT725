const {MongoClient, ServerApivVrsion} = require('mongodb'); 
const uri = ("mongodb+srv://admin:admin2@clustere.19hmwv8.mongodb.net/?retrywrites=true&w-majority"); 
 const client = new Mongoclient(uri, {}
    serverApi: { 
        version: ServerApiVersion.v1, 
        strict: true, 
        deprecationErrors: true, 
    });
     client.connect() ;
     module.exports = client;