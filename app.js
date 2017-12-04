const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  let date = new Date().toString();
  let log = `${date} and ${req.url}`;
  fs.appendFile('server.log',log+'\n');
  next();
})

app.get('/',(req,res)=>{
  res.render('bio.hbs',{
    currentYear:new Date().getFullYear()
  })
})



app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Market Analysis',
    currentYear: new Date().getFullYear()
  });
})




app.listen(port,()=>{
  console.log(`Server is up and running on the port ${port}`);
});
