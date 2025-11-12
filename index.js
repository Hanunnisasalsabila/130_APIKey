const express = require('express')
const path = require('path')
const crypto = require('crypto')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
const port = 3306

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SachaFoxie8',
  database: 'apikey_db'
})

