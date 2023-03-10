//server connection code
const express = require("express");
var app = express();
app.listen( process.env.PORT || 3000, () => { console.log("server started"); });

//body parser connect
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//static folder connect
app.use(express.static("public"));

//https module connect
const https= require("https");

//show signup.html
app.get("/", function (req, res) { res.sendFile(__dirname + "/signup.html") });

//get posted data
app.post("/", (req, res) => 
{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    // put user entered data to javascript object which is array of objects
    var data =
    {
        members: 
        [{
            email_address: email,

            status: "subscribed",

            merge_fields: 
            {
                FNAME: fname,
                LNAME: lname,
                PHONE:"0315-******"
            }
        }]
    };



    //convert it to JSON
    const jsonData= JSON.stringify(data);

    //call mailchimp api

    //us21 is your server name which we get from api key

    //to call api list we have to write lists/list-key in api url

    const url= " https://us21.api.mailchimp.com/3.0/lists/2337ca2219";

    //details about authentication key and post method
    const options=
    {
        method:"post",
        // username:key
        auth:"amir:99a61ba98c01c69e683a15a5cc2b9054-us21"
    }

    //post request
    const request= https.request(url,options,function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html"); 
        } else
        {
            res.sendFile( __dirname+"/failure.html");
        }
        
    })

    //send data to api
    request.write(jsonData);
    request.end();
})

// API KEY: 7ddbe0111fdc0f6ecfc264f76efaf5f9-us21

// LIST KEY: 2337ca2219
