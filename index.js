import express from 'express';
import {movies, movieDetail, categoryMovies} from './MovieController.js';

const app = express();

const listeningPort = 3001

app.use(express.json());

app.listen(listeningPort, () => console.log(`Server is listening on port ${listeningPort}`));

//Get with 'limit' and 'category' queries
app.get('/movies', movies)

//GET with id
app.get('/movies/:id', movieDetail)

//Get movies by category
app.get('/categories/:id/movies', categoryMovies)

//POST Request
//app.post('/books', createBook)

//PUT Request
//app.put('/books/:id', updateBook)

//DELETE Request
//app.delete('/books/:id', deleteBook)