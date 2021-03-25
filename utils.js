const fs = require('fs')
const path = require('path')

module.exports = {
    getCoffeeData
}

function getCoffeeData(callback) {
    const filename = path.join(__dirname, 'CoffeeShopsData.json')

    fs.readFile(filename, 'utf8', (err, contents) => {
        if (err) {
            console.error(err.message)
            callback(new Error('Unable to load the file'))
            return
        }
        try {
            const parsedData = JSON.parse(contents)
            callback(null, parsedData)
        } catch (parseError) {
            console.error(parseError)
            callback(new Error('Unable to parse the data file'))
        }
    })
}