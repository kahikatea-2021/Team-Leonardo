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
  const coffeeShopId = Number(req.params.id)
  const commentToAdd = ' ' + req.body.comment

  getCoffeeData((err, coffeeData) => {
    const filename = path.join(__dirname, '../CoffeeShopsData.json')

    if (err) {
      console.log(err.message)
      res.status(500).send(err.message)
      return
    }

    const index = coffeeData.CoffeeShops.findIndex(coffeeShop => coffeeShop.id === coffeeShopId)
    const coffeeShopComments = coffeeData.CoffeeShops[index].comments
    coffeeShopComments.push(commentToAdd)

    fs.writeFile(filename, JSON.stringify(coffeeData), (err) => {
      if (err) {
        console.log(err)
        res.status(500)
      } else {
        res.redirect(`/coffeeshop/${coffeeShopId}`)
      }
    })
  })
})

module.exports = router
