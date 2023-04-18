const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 3001

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let myName = "Sakhia"

const pizzaList = {
    "pizza1" : {
        type: "Cheese Pizza" , 
        size: "XL", 
        company: "Dominos",
        price: "14.99$",
        pic: "https://pbs.twimg.com/media/EovK3mfW4AEHasp.jpg"
    },
    "pizza2" : {
        type: "BBQ Pizza" , 
        size: "S", 
        company: "Pizza Pizza",
        price: "13.99$",
        pic: "https://www.budgetbytes.com/wp-content/uploads/2020/06/BBQ-Chicken-Pizza-one-slice.jpg"
    },
    "pizza3" : {
        type: "All-Dress Pizza" , 
        size: "L", 
        company: "Pizza Hut",
        price: "18.99$",
        pic: "https://www.oyetimes.com/wp-content/uploads/2012/02/food_alldressedpizza.jpg"
    },
    "pizza4" : {
        type: "Pepperoni Pizza" , 
        size: "M", 
        company: "Little Caesars",
        price: "14.99$",
        pic: "https://imageio.forbes.com/specials-images/imageserve/61d0c89c810c8ff36355465d/0x0.jpg?format=jpg&width=1200"
    },
}

app.get('/', function (req, res) {
    // console.log(Object.values(pizzaList))
    res.render("Homepage", {pizzaList: pizzaList})
})

app.get('/addPizza', function (req, res) {
    res.render("addPizza")
})

app.get('/editPizza/:pizzaId', function (req, res) {
    console.log(req.params.pizzaId)
    const chosenPizza = req.params.pizzaId
    console.log(pizzaList[chosenPizza])
    res.render("editPizza", {pizza: pizzaList[chosenPizza], chosenPizza: chosenPizza})
})

app.post('/api/addPizza', function (req, res) {
    console.log(req.body)
    const array = Object.values(pizzaList)
    console.log(array)
    const length = array.length
    console.log(length)
    const newPizzaKey = `pizza${length + 1}`
    console.log(newPizzaKey)
    pizzaList[newPizzaKey] = req.body
    console.log(pizzaList)
    res.redirect("/")
})

app.post('/api/editPizza/:pizzaId', function (req, res) {
    console.log(req.params.pizzaId)
    const chosenPizza = req.params.pizzaId
    pizzaList[chosenPizza] = req.body
    console.log(pizzaList)
    res.redirect("/")
})

app.post('/api/deletePizza/:pizzaId', function (req, res) {
    console.log(req.params.pizzaId)
    const chosenPizza = req.params.pizzaId
    delete pizzaList[chosenPizza]
    console.log(pizzaList)
    res.redirect("/")
})

app.listen(PORT, () => {
    console.log("The server is running on PORT: " + PORT)
})