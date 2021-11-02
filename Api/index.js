const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const {movies} = require('./movies.json');
app.get('/movies', (req, res)=>{
    res.json(movies);
})
app.post('/movies', (req, res)=>{
    movies.push({...req.body,id:movies.length});
    res.json(movies);
})
app.put('/movies/:id', (req, res)=>{
    const index = movies.findIndex((m)=>m.id.toString()===req.params.id.toString());
    movies[index]=req.body;
    res.json(movies);
})
app.delete('/movies/:id', (req, res)=>{
    const index = movies.findIndex((m)=>m.id.toString()===req.params.id.toString());
    movies.splice(index,1)
    res.json(movies);
})
app.listen(3000);
