/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');

let todos = [{
  "title":"first thing",
  "description":"This is my first todo",
  "completed": "true",
  "id":1
},{
  "title":"Laundry",
  "description":"time to do laundry",
  "completed": "false",
  "id":2
},{
  "title":"Me time",
  "description":"GO out and live fully",
  "completed": "false",
  "id":3
}]

const app = express();

app.use(bodyParser.json());

// creating endpoint get/todos for retrving all todos
app.get('/todos',(req,res)=>{
  res.send(todos);
  res.status(200);
})

// creating endpoint for retriving perticuler todo
app.get('/todos/:id',(req,res)=>{
  const todos_id = req.params.id;
  let data = todos.find(todo => todo.id==todos_id);

  console.log(typeof(data));
  if(typeof(data)=='undefined'){
    res.status(404);
    res.send("no such task found")
  }else{
    res.send(data);
    res.status(200);
  }

})

// endpoint for creating new todo task
app.post('/todos',(req,res)=>{
  let data = req.body;
  todos.push(data);
  console.log(todos);
  res.send({"new task added":data})
  res.status(201);

})

//endpoit for updating task
app.put("/todos/:id",(req,res)=>{
  let org_data = todos.findIndex(todo=>todo.id==req.params.id);


  if(typeof(org_data!='undefined')){
    let new_data = req.body;
    todos[org_data] = new_data;
    console.log(todos[org_data]);
    res.send(todos.find(todo=>todo.id==req.params.id))
    res.status(200);
  }else{
    res.status(404);
    res.send("no such task found")
  }
  
})

//endpoint for deleting task
app.delete("/todos/:id",(req,res)=>{
  const del_data = todos.find(todo=>todo.id==req.params.id);


  if(typeof(del_data)!='undefined'){
    todos = todos.filter(todo=>todo.id!=req.params.id);
    console.log(todos);
    res.send({"task removed":del_data});
    res.status(200);
  }else{
    res.status(404);
    res.send("no such task found")
    
  }
})

app.listen(8030,()=>{
  console.log("server is running on 8030")
})

module.exports = app;
