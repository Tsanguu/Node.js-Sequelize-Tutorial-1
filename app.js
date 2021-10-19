const express = require("express"); // import express
const {sequelize, User, Post} = require('./models'); // import models

const app = express(); // create a new express app
app.use(express.json());

app.get('/', function (req, res) {
    res.send('App running')
});

app.post("/users", async(req,res) =>{
    const { name, email, role} = req.body
    try{
        const user = await User.create({name, email, role});
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//Fetch users
app.get("/users", async(req,res) =>{
    try{
        const users = await User.findAll({include:'posts'});
        return res.json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});

//Find user
app.get("/users/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id},
            include:'posts'
        });
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});

//Update user
app.put("/users/:id", async(req,res) =>{
    const id = req.params.id;
    const { name, email, role} = req.body;
    try{
        const user = await User.findOne({
            where: {id}
        });
        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();
        return res.json(user);

    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});

//Delete user
app.delete("/users/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id}
        });
        await user.destroy();
        return res.json({message: "User Deleted"});
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});

// Create new post
app.post("/posts", async(req,res) =>{
    const { content, userId} = req.body
    try{
        const user = await User.findOne({
            where: {id: userId}
        });
        const post = await Post.create({content, userId: user.id });
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

// Get posts
app.get("/posts", async(req,res) =>{
    try{
        const posts = await Post.findAll({include:'users'});
        return res.json(posts);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

app.listen({port: 5005}, async() =>{
    console.log('server running on http://localhost:5005');
    //await sequelize.sync({force: true}); //This creates the table, dropping them first if they already existed
    await sequelize.authenticate();
});
