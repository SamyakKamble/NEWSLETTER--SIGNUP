
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname ;
    const  email = req.body.email ;

    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }
        ]
    };
    var jsonData= JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/6c435def6a"
     
    const options = {
        method:"POST",
        auth: "samyak:4a27a554e2e486d22f756fb186d14070-us12"
    }
   const request = https.request(url, options , function(response){

       if (response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
       }else{
        res.sendFile(__dirname + "/failure.html");
       }

         


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000 ,function(){

    console.log("Server is working on server 3000");
})


///69b0e5537ac56ac436b84b6359571fd8-us12

//6c435def6a