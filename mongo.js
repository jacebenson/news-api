//move to /express
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGODB_URI;

// Database Name
const dbName = 'news';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  const col = db.collection('find');
  // Insert multiple documents
  col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
    //assert.equal(null, err);
    //assert.equal(3, r.insertedCount);

    // Get first two documents that match the query
    col.find({a:1}).limit(2).toArray(function(err, docs) {
      //assert.equal(null, err);
      //assert.equal(2, docs.length);
      console.log(docs);
      client.close();
    });
  });
});