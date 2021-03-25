const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {
    res.send('Hi from list')
})

router.get('/coffeeshop/:id', (req, res) => {
    res.send('Hi from coffeeshop number ' + req.params.id)
})

router.post('/cofeeshop/:id/comment', (req, res) => {

})

module.exports = router