const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

 var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n' ,(err) =>{
        if(err)
         console.log('Unable to tog to server.log');
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

 app.get('/',(request, response)=>{
    //response.send('<h1>Hello Express..</h1>');
    // response.send({
    //     name:'Priyanka',
    //     likes:[
    //         'travelling',
    //         'cooking'
    //     ]
    // });
    response.render('home.hbs',{
        pageTitle:'Home Page ',
        welcomeMessage: 'Welcome'
    });
 });

 app.get('/about',(req,res) =>{
   // res.send('About Page');
   res.render('about.hbs',{
       pageTitle:'Aboutasda '
   });
});


app.get('/bad',(req,res) =>{
    res.send({
        errorMessage:'unable to handle request'
    });
});

 app.listen(port, ()=>{
     console.log(`Server is up on ${port}`);
 });