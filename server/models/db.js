var mongoose = require('mongoose');
//mongoose.connect('mongodb://iambrian:bkcbkc07@ds031108.mlab.com:31108/aalinks');
mongoose.connect('mongodb://localhost:27017/vue-meetings', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected to products/geomeetings")
});
// const { MongoClient, ObjectID } = require('mongodb');

//  function(req, res) {
//  (async function mongo() {
//       let client;
//       try {
//         client = await MongoClient.connect(url, {useNewUrlParser: true});
//         debug('Connected correctly to server');

//         const db = client.db(dbName);
// }


//mongodb://<dbuser>:<dbpassword>@ds031108.mlab.com:31108/aalinks
var testMeeting = {
  "id": 40997,
  "name": "Gratitude and Promises",
  "slug": "gratitude-and-promises-5",
  "notes": "Meeting is in the conference room.",
  "updated": "2016-01-07 00:24:09",
  "location_id": 41872,
  "url": "http://aaminneapolis.org/meetings/gratitude-and-promises-5/",
  "time": "07:00",
  "time_formatted": "7:00 am",
  "day": "1",
  "types": [
    "BB",
    "HE",
    "MW",
    "O"
  ],
  "address": "1428 Nicollet Avenue South",
  "city": "Minneapolis",
  "state": "MN",
  "postal_code": "55403",
  "country": "US",
  "latitude": "44.9678439",
  "longitude": "-93.2780145",
  "region_id": "1385",
  "region": "Minneapolis, Downtown",
  "sub_region": "",
  "timezone": "America/Chicago",
  "location": "The Nicollet Diner",
  "location_url": "http://aaminneapolis.org/locations/the-nicollet-diner/",
  "location_slug": "the-nicollet-diner",
  "location_notes": "Meeting is in the conference room.",
  "location_updated": "2016-02-20 01:32:49",
  "group": null,
  "group_notes": null
}
var Schema   = mongoose.Schema;

var meetingSchema = new mongoose.Schema(
  {
    "name" : String,
    "slug": String,
    "updated": Date,
    "day" : String,
    "time" : String,
    "time_formatted": String,
    "types": [String],
    "id": Number,
    "location_id": Number, // raw meetings now sequential ids
    "address": String,
    "city": String,
    "state":String,
    "postal_code": String,
    "country": String,
    "loc": {
      "coordinates": [Number],
      "type": { type: String, index : true }
    },
    // "loc": {
    //   "formType": [Number],  // [<longitude>, <latitude>]
    //   "index": String,      // create the geospatial index
    // },
    // "latitude": Number,
    // "longitude": Number,
    "location": String,
    "location_slug": String,
    "location_notes": String,
    "location_updated": Date,
    "group": String,
    "group_notes": String
  });

module.exports = mongoose.model('Geomeetings', meetingSchema);