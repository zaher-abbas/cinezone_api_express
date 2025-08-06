import {database} from "./database.js";

export const movies = (req, res) => {
    const limit = parseInt(req.query.limit)
    const minRating = parseFloat(req.query.min_rating)

    if (limit && limit > 0 && !minRating) {
        database.query('SELECT * FROM movie LIMIT ?', [limit])
            .then(result => {
                const [movies] = result;
                return res.json(movies);
            })
            .catch(err => {
                console.error(err)
            })
    } else if (limit && limit > 0 && minRating) {
        database.query('SELECT * FROM movie WHERE rating >= ? LIMIT ?', [minRating, limit])
            .then(result => {
                const [movies] = result;
                return res.json(movies);
            })
            .catch(err => {
                console.error(err)
            })
    } else if (!limit && minRating) {
        database.query('SELECT * FROM movie WHERE rating >= ?', [minRating])
            .then(result => {
                const [movies] = result;
                return res.json(movies);
            })
            .catch(err => {
                console.error(err)
            })


    } else {
        database.query('SELECT * FROM movie')
            .then(result => {
                const [movies] = result;
                return res.json(movies);
            })
            .catch(err => {
                console.error(err)
            })
    }
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