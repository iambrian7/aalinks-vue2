require('dotenv').config()
var express = require('express');
var cors = require('cors')
var path = require('path');
// var bodyParser = require('body-parser');

var app = express()

const port = process.env.PORT || 8086


app.use(cors())
app.use(express.json());
// app.use(bodyParser.json());


app.get('/test', (req, res) => {
  miles = 2;
  console.log(`get(/test): get ${miles} miles locations from ${base.lat}:${base.lng}`)
  var foundLocations = findLocations(loc, miles)
  foundLocations = dups(foundLocations);
  console.log(`/test: foundLocations: ${foundLocations.length} from loc: ${JSON.stringify(foundLocations, null, 3)}`);
  // console.log(`/test: slice 4 from loc: ${JSON.stringify(foundLocations.slice(0,5), null, 3)}`);
   var mymeetings = getAllMeetingsFromLocations(foundLocations)
  
  console.log(`found: locations = ${foundLocations.length} meetings = ${mymeetings.length}`)
  res.status("200").send(JSON.stringify({locations:foundLocations, meetings:mymeetings}));
})
app.get("/stripekey", (req, res) => {
  console.log(`get:/stripe-key: ${process.env.STRIPE_PUBLISHABLE_KEY}`)
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Routes
app.use('/charge', require('./api/charge.js'));
app.use('/api', require('./routes/meetings.js'));
app.use('/meeting', require('./routes/meetings.js'));


console.log(` dirname=${__dirname} `)
console.log(` resolve: dirname=${path.resolve(__dirname, "public")} `)
console.log('public is : ' + __dirname + '/public/')
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)
// Handle production
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(path.resolve(__dirname, "public")));
//   // app.use(express.static(__dirname + '/public/'));


//   // Handle SPA
//   app.get(/.*/, (req, res) => res.redirect('/'));
//   // app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }
console.log(`port is ${port}`)
console.log(`process.env.PORT is ${process.env.PORT}`)
app.listen(port, ()=>{
  console.log(`API listening on port ${port}`);
});