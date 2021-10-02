// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/requestHeaderParser", function (req, res) {
  res.sendFile(__dirname + '/views/requestHeaderParser.html');
});

app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  console.log({greeting: 'hello API'})
  res.json({greeting: 'hello API'});
});

//////////////////////////////
// ---- Timestap ----      //
////////////////////////////
app.get("/api/timestamp/",(req, res)=>{
  let nowDate = new Date();
  res.json({
    "unix": nowDate.getTime(),
    "utc": nowDate.toUTCString()
  });
})

app.get("/api/timestamp/:date", function (req, res)  {
  let date = req.params.date;
  let pdate = parseInt(date);
  let npud = new Date(pdate)
  let passedInValue = new Date(date);
  if(date.length === 13){
    res.json({
      "unix": npud.getTime(),
      "utc": npud.toUTCString()
  })
}
  if(passedInValue == "Invalid Date"){
    res.json({
      "error": "Invalid Date"
    })
  }else{
    res.json({
      "unix": passedInValue.getTime(),
      "utc": passedInValue.toUTCString()
    })
  }
});
/////////////////////////////////////
// Request Header Parser ----------//
/////////////////////////////////////
app.get('/api/whoami',(req,res)=>{

  res.json({
    "ipaddress": req.ip,
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
  })
})








// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
