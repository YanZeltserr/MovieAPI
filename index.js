const express = require('express')
const app = express()
const port = 3004

app.get('/', (req, res) => {
    res.send('Hello World!!')
  })

app.get('/getAllMovies', (req, res) => {
    pool.query('SELECT TOP 10 * FROM movies', (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return;
        }
        res.send( results.rows);
      });
})

app.get('/getMovieById/:id', (req, res) => {
    pool.query(`SELECT * FROM movies WHERE id = ${req.params.id}`, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return;
        }
        res.send( results.rows);
      });
})

app.delete('/deleteMovieById/:id', (req, res) => {
  pool.query(`DELETE FROM movies WHERE id = ${req.params.id}`, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    res.send( `Deleted: ${results.rows}`);
  });
})

app.post('/addMovie', (req, res) => {
    const { title, genre, year } = req.body
    pool.query('INSERT INTO movies (title, genre, year) VALUES ($1, $2, $3) RETURNING *', [title, genre, year], (error, results) => {
      if (error) {
        throw error
      }
      res.send(`Movie added: ${results.rows}`)
    })
})

app.put('/updateMovie/:id', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'movies-rds-new-cluster-instance-1.c8bveno3arbg.eu-central-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'GiniAdmin',
    port: 5432
  });
