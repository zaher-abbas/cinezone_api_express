import {database} from "./database.js";


export const movies = (req, res) => {
    database.query('SELECT * FROM movie')
        .then(result => {
            const [movies] = result; //on a déconstructuré le tableau result par [] et affecté le 1er element à books
            const limit = req.query.limit
            const minRating = req.query.min_rating
            if (minRating && !limit) {
                const minRatedMovies = movies.filter(movie => movie.rating >= minRating);
                return res.json(minRatedMovies);
            } else if (minRating && limit) {
                const minRatedMovies = movies.filter(movie => movie.rating >= minRating);
                const filteredMovies = minRatedMovies.slice(0, limit);
                return res.json(filteredMovies);
            } else if (!minRating && limit) {
                const filteredMovies = movies.slice(0, limit);
                return res.json(filteredMovies);
            }
            return res.json(movies);
        })
        .catch(err => {
            console.error(err)
        })
}

export const movieDetail = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM movie WHERE id = ?', [id])
        .then(result => {
            const [movies] = result;
            if (movies.length > 0) {
                return res.json(movies[0]);
            }
            return res.sendStatus(404);
        })
        .catch(err => {
            console.error(err)
        })
}

export const categoryMovies = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM movie WHERE category_id = ?', [id])
        .then(result => {
            const [movies] = result;
            if (movies.length > 0) {
                return res.json(movies);
            }
            return res.sendStatus(404);
        })
        .catch(err => {
            console.error(err)
        })
}