import express from 'express';
import dotenv from 'dotenv';
import {logger} from "./middlewares/logger.js";
import {movieValidator} from "./middlewares/movieValidator.js";

dotenv.config();
import {movies, movieDetail, categoryMovies, addMovie, updateMovie, deleteMovie} from './Controller/MovieController.js';
import {requireAdminRole} from "./middlewares/requireAdminRole.js";
import {userValidator} from "./middlewares/userValidator.js";
import {emailNotExistsValidator} from "./middlewares/emailNotExistsValidator.js";
import {hashPassword} from "./middlewares/hashPassword.js";
import {registerUser} from "./Controller/UserController.js";

const app = express();

app.use(logger);
app.use(express.json());

const listeningPort = process.env.PORT || 3000; //3000 c'est la valeur de secours au cas où env.PORT n'existe pas

app.listen(listeningPort, () => console.log(`Server is listening on port ${listeningPort}`));

//Home endpoint / Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to CineZone API')
})

//Get movies with 'limit' and 'category' queries
app.get('/movies', movies)

//GET movie with id
app.get('/movies/:id', movieDetail)

//Get movies by category
app.get('/categories/:id/movies', categoryMovies)

//POST movie Request
app.post('/movies', movieValidator, addMovie)

//PUT movie Request
app.put('/movies/:id', movieValidator, updateMovie)

//DELETE movie Request
app.delete('/movies/:id', requireAdminRole, deleteMovie)

//authentification, Post user
app.post('/users', userValidator, emailNotExistsValidator, hashPassword, registerUser);