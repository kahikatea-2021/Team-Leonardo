const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const { getCoffeeData } = require('../utils')

router.get('/', (req, res) => {
  getCoffeeData((err, coffeeData) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    const viewData = {
      title: 'coffee',
      coffeeShops: coffeeData.CoffeeShops
    }
    const template = './layouts/home'
    res.render(template, viewData)
  })
})

router.get('/coffeeshop/:id', (req, res) => {
  getCoffeeData((err, coffeeData) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    const coffee = coffeeData.CoffeeShops.find((element) => element.id === Number(req.params.id))
    const viewData = {
      id: coffee.id,
      name: coffee.name,
      image: coffee.image,
      address: coffee.address,
      description: coffee.description,
      rating: coffee.rating,
      comments: coffee.comments
    }
    const template = './layouts/coffeeShop'
    res.render(template, viewData)
  })
})

router.post('/coffeeshop/:id/comment', (req, res) => {
  console.log(Number(req.params.id))
})

module.exports = router
