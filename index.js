import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {logger} from "./middlewares/logger.js";
import {movieValidator} from "./middlewares/movieValidator.js";

dotenv.config();
import {
    list as listMovies,
    show as showMovie,
    listByCategory as listByCategory,
    insert as insertMovie,
    update as updateMovie,
    remove as deleteMovie
} from './Controller/MovieController.js';
import {requireAdminRole} from "./middlewares/requireAdminRole.js";
import {userValidator} from "./middlewares/userValidator.js";
import {emailNotExistsValidator} from "./middlewares/emailNotExistsValidator.js";
import {hashPassword} from "./middlewares/hashPassword.js";
import {insert as insertUser, login, profile} from "./Controller/UserController.js";
import {requireAuth} from "./middlewares/requireAuth.js";
import {findUserByEmail} from "./middlewares/findUserByEmail.js";
import {verifyPassword} from "./middlewares/verifyPassword.js";
import cors from 'cors';

const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use((cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    credentials: true,
})));

const listeningPort = process.env.PORT || 3000; //3000 c'est la valeur de secours au cas où env.PORT n'existe pas

app.listen(listeningPort, () => console.log(`Server is listening on port ${listeningPort}`));

//Home endpoint / Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to CineZone API')
})

//Get movies with 'limit' and 'category' queries
app.get('/movies', listMovies)

//GET movie with id
app.get('/movies/:id', showMovie)

//Get movies by category
app.get('/categories/:id/movies', listByCategory)

//POST movie Request
app.post('/movies', requireAuth, movieValidator, insertMovie)

//PUT movie Request
app.put('/movies/:id', requireAuth, movieValidator, updateMovie)

//DELETE movie Request
app.delete('/movies/:id', requireAdminRole, deleteMovie)

//Register Post user
app.post('/users', userValidator, emailNotExistsValidator, hashPassword, insertUser);

//login
app.post('/login', findUserByEmail, verifyPassword, login)

//user profile
app.get('/profile', requireAuth, profile)