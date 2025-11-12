const express = require('express')
const path = require('path')
const crypto = require('crypto')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
const port = 3306