const express = require("express");
const fs = require('fs');

const app = express();
let blogs = [];

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

//middleware & static files

app.use((req, res, next) => {
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    next();
});

app.use(express.static('public'));

const blogsPath = "./public/blogs.json";
fs.readFile(blogsPath, (err, data)=>{
    if(err){
        console.log(err);
    }else{
        blogs = JSON.parse(data);
    }
});

app.get('/add-blog', (req, res)=>{
    const blog = {id: 0, title: "", snippet: "", body: ""};
    fs.readFile(blogsPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.push(blog);
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(blogsPath, json, 'utf8', ()=>{}); // write it back 
    }});
    res.send(blog);
});

app.get('/', (req, res) => {
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create A New Blog'});
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});