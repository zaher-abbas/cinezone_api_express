import {database} from "./database.js";

export const movies = (req, res) => {
    const limit = parseInt(req.query.limit)
    const minRating = parseFloat(req.query.min_rating)

    if (limit && limit > 0 && !minRating) {
        database.query('SELECT * FROM movie ORDER BY title ASC LIMIT ?', [limit])
            .then(result => {
                const [movies] = result;
                if (movies.length > 0)
                    return res.json(movies);
                else
                    return res.sendStatus(404);
            })
            .catch(err => {
                return res.sendStatus(500)
            })
    } else if (limit && limit > 0 && minRating) {
        database.query('SELECT * FROM movie WHERE rating >= ? ORDER BY rating DESC LIMIT ?', [minRating, limit])
            .then(result => {
                const [movies] = result;
                if (movies.length > 0)
                    return res.json(movies);
                else
                    return res.sendStatus(404);
            })
            .catch(err => {
                return res.sendStatus(500)
            })
    } else if (!limit && minRating) {
        database.query('SELECT * FROM movie WHERE rating >= ? ORDER BY rating DESC', [minRating])
            .then(result => {
                const [movies] = result;
                if (movies.length > 0)
                    return res.json(movies);
                else
                    return res.sendStatus(404);
            })
            .catch(err => {
                return res.sendStatus(500)
            })


    } else {
        database.query('SELECT * FROM movie ORDER BY title ASC')
            .then(result => {
                const [movies] = result;
                if (movies.length > 0)
                    return res.json(movies);
                else return res.sendStatus(404);
            })
            .catch(err => {
                return res.sendStatus(500)
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
            return res.sendStatus(500);
        })
}

export const categoryMovies = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM movie WHERE category_id = ? ORDER BY title ASC', [id])
        .then(result => {
            const [movies] = result;
            if (movies.length > 0) {
                return res.json(movies);
            }
            return res.sendStatus(404);
        })
        .catch(err => {
            return res.sendStatus(500);
        })
}

export const addMovie = (req, res) => {
    const {title, director, release_year, rating} = req.body;
    database.query('INSERT INTO movie (title, director, release_year, rating) VALUES (?, ?, ?, ?)', [title, director, release_year, rating])
        .then(result => {
            return res.sendStatus(201);
        })
        .catch(err => {
                return res.sendStatus(500);
            }
        )
}

export const updateMovie = (req, res) => {
    const {title, director, release_year, rating, category_id} = req.body;
    const id = parseInt(req.params.id);
    database.query('UPDATE movie SET title = ?, director = ?, release_year = ?, rating = ?, category_id = ? WHERE id = ?', [title, director, release_year, rating, category_id, id])
        .then(result => {
            const [resultSet] = result;
            if (resultSet.affectedRows === 0)
                return res.sendStatus(404);
            else
                return res.sendStatus(200);
        })
        .catch(err => {
            return res.sendStatus(500);
        })
}

export const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    database.query('DELETE FROM movie WHERE id = ?', [id])
        .then(result => {
            const [resultSet] = result;
            if (resultSet.affectedRows === 0)
                return res.sendStatus(404);
            else
                return res.sendStatus(204);
        })
        .catch(err => {
            return res.sendStatus(500);
        })
}