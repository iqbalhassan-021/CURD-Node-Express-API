const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 8000;
const fs = require('fs');


//Adding the sample data
const users = require("./Users.json");


// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Routs
//Home
app.get('/', (req, res) => {
  res.send('This is a test API!, Use /api/users to load the users');
});

//Get all the users
app.get('/api/users', (req, res) => {

  return res.json(users);
});

//Get the single user detail
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);
  return res.json(user);
});

//Edit the user with :id
app.patch('/api/users/:id',(req, res) => {
  return res.json({status : "Pending"});
});

//Delete the user with :id
app.delete('/api/users/:id',(req, res) => {
  return res.json({status : "Pending"});
});

//Upload a user
app.post('/api/users',(req, res) => {
  const body = req.body;
  users.push({...body, id: users.length + 1});
  fs.writeFile("./Users.json", JSON.stringify(users), (err, data) => {
    return res.json({status : "Success", id: users.length + 1});
  });
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});