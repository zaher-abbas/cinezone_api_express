import {database} from "../Config/database.js";

export const list = (req, res) => {
    const limit = parseInt(req.query.limit)
    const minRating = parseFloat(req.query.min_rating)

    if (limit && limit > 0 && !minRating) {
        database.query('SELECT * FROM movies ORDER BY title LIMIT ?', [limit])
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
        database.query('SELECT * FROM movies WHERE rating >= ? ORDER BY rating DESC LIMIT ?', [minRating, limit])
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
        database.query('SELECT * FROM movies WHERE rating >= ? ORDER BY rating DESC', [minRating])
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
        database.query('SELECT * FROM movies ORDER BY title')
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
export const show = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM movies WHERE id = ?', [id])
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

export const listByCategory = (req, res) => {
    const id = req.params.id;
    database.query('SELECT * FROM movies WHERE category_id = ? ORDER BY title', [id])
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

export const insert = (req, res) => {
    const {title, director, release_year, rating} = req.body;
    database.query('INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)', [title, director, release_year, rating])
        .then(result => {
            return res.sendStatus(201).send({message: 'Movie created successfully'});
        })
        .catch(err => {
                return res.sendStatus(500);
            }
        )
}
//Ici j'ai tenté l'approche de Async/Await qui est plus moderne que l'approche de promesse '.then'
export const update = async (req, res) => {
    if (!req.body)
        return res.sendStatus(400).send({message: 'No data provided'});
    try {
        const {title, director, release_year, rating, category_id} = req.body;
        const id = parseInt(req.params.id);
        const result = await database.query('UPDATE movies SET title = ?, director = ?, release_year = ?, rating = ?, category_id = ? WHERE id = ?', [title, director, release_year, rating, category_id, id])
        const [resultSet] = result;
        if (resultSet.affectedRows === 0)
            return res.sendStatus(404).send({message: 'Movie not found'});
        else
            return res.sendStatus(200).send({message: 'Movie updated successfully'});

    } catch (err) {
        return res.sendStatus(500);
    }
}

//Ici aussi j'ai utilisé l'approche de Async/Await
export const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await database.query('DELETE FROM movies WHERE id = ?', [id])
        const [resultSet] = result;
        if (resultSet.affectedRows === 0)
            return res.sendStatus(404).send({message: 'Movie not found'});
        else
            return res.sendStatus(204).send({message: 'Movie deleted successfully'});

    } catch (err) {
        return res.sendStatus(500);
    }
}