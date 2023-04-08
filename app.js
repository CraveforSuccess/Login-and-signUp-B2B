const express = require('express')
const mongoose = require('mongoose')
const md5 = require('md5')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()


mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://Login_and_Signup:Iamphenomenol1@cluster0.hg08l0b.mongodb.net/?retryWrites=true&w=majority')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
// Code Starts
const User = new mongoose.Schema({
    Name: { type: String },
    Email: { type: String },
    Password: { type: String }
})

const NewUser = mongoose.model('NewUser', User)


app.post('/',(req,res)=>{
    var password = md5(req.body.password)
    NewUser.find({Email:req.body.email})
    .then((docs)=>{
    console.log("Found");
       if(docs[0].Password === password){  //Matching md5 strings
       res.send("Successfully Logged In")
       }
       else{  //password wrong , no login
        res.send("Wrong Password")
        return;
       }
      
    })
    .catch((err)=>{
        console.log(err);
        return;
    })
})

app.get('/', (req, res) => {
    res.render('Login')
})

app.post('/SignUp', (req, res) => {
    var UserObj = {
        Name: req.body.name, //Bodyparser will take name
        Email: req.body.email, //Bodyparser will take email
        Password: md5(req.body.password) //md5 encryption for password
    }
    NewUser.insertMany(UserObj)
        .then(() => {
            res.redirect('/')
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
})

app.get('/SignUp', (req, res) => {
    res.render('SignUp')
})
app.listen(3000, () => {
    console.log("Running");
})
