const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
app.use(cors());

async function main() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://miBaburao:Fuckth4king@cluster0.xul9c.mongodb.net/GuestData?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    // let databasesList = await client.db().admin().listDatabases();
    let cursor = await client.db('GuestDatabase').collection("GuestData").find({});
    let results = await cursor.toArray()
    console.log(results)
    // <console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});