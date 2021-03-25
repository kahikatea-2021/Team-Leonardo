const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const { getCoffeeData } = require("../utils");

router.get('/', (req, res) => {
    getCoffeeData((err, coffeeData) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        console.log(coffeeData)
        const viewData = {
            title: "coffee",
            coffeeShops: coffeeData.CoffeeShops
        };
        const template = "home";
        res.render(template, viewData)
    })

})

router.get('/coffeeshop/:id', (req, res) => {
    res.send('Hi from coffeeshop number ' + req.params.id)
})

router.post('/cofeeshop/:id/comment', (req, res) => {

})

module.exports = router