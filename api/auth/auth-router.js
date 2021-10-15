const router = require('express').Router();
const User = require('../users/usersModel');
const { jwtSecret } = require('../auth/secret');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mw = require('../recipes/middleware');
const { 
    checkU
 } = require('./auth-middleware');


router.post('/register', mw)

