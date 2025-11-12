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

db.connect((err) => {
  if (err) {
    console.error('❌ Gagal terhubung ke database:', err)
  } else {
    console.log('✅ Terhubung ke database MySQL')
  }
})

app.get('/test', (req, res) => {
  res.send('Server API Key berjalan normal 🚀')
})

app.post('/create', (req, res) => {
  const apiKey = `sk-sm-v1-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

  const query = 'INSERT INTO api_keys (api_key) VALUES (?)'
  db.query(query, [apiKey], (err, result) => {
    if (err) {
      console.error('❌ Gagal menyimpan API key:', err)
      return res.status(500).json({ message: 'Gagal menyimpan API key.' })
    }

    console.log('🔑 API Key baru disimpan:', apiKey)
    res.json({ apiKey })
  })
})

app.post('/checkapi', (req, res) => {
  const { apiKey } = req.body

  if (!apiKey) {
    return res.status(400).json({ valid: false, message: 'API key tidak boleh kosong.' })
  }

  const query = 'SELECT * FROM api_keys WHERE api_key = ?'
  db.query(query, [apiKey], (err, results) => {
    if (err) {
      console.error('❌ Gagal mengecek API key:', err)
      return res.status(500).json({ valid: false, message: 'Terjadi kesalahan server.' })
    }

    if (results.length > 0) {
      res.json({ valid: true, message: 'API key valid ✅' })
    } else {
      res.json({ valid: false, message: 'API key tidak valid ❌' })
    }
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`)
})