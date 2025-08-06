import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import {movies, movieDetail, categoryMovies, addMovie, updateMovie, deleteMovie} from './MovieController.js';

const app = express();

app.use(express.json());

const listeningPort = process.env.PORT || 3000; //3000 c'est la valeur de secours au cas où env.PORT n'existe pas

app.listen(listeningPort, () => console.log(`Server is listening on port ${listeningPort}`));

//Home endpoint / Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to CineZone API')
})

//Get with 'limit' and 'category' queries
app.get('/movies', movies)

//GET with id
app.get('/movies/:id', movieDetail)

//Get movies by category
app.get('/categories/:id/movies', categoryMovies)

//POST Request
app.post('/movies', addMovie)

//PUT Request
app.put('/movies/:id', updateMovie)

//DELETE Request
app.delete('/movies/:id', deleteMovie)