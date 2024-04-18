import ejs from "ejs"
import express from "express"

const port = 3000
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))

let postTitle = []
let postDescription = []
let postCounter = postTitle.length



app.get("/", (req, res) => {
    res.render("index.ejs")
    console.log("index.ejs loaded")
})

app.get("/create", (req, res) => {
    res.render("create.ejs")
    console.log("create.ejs loaded")
})

app.post("/", (req, res) => {
    res.render("index.ejs")
    postTitle.push(req.body.titleInput)
    postDescription.push(req.body.descriptionInput)
    console.log("index.ejs posted")
    console.log(`${postTitle} | ${postDescription}`)
})

app.post("/create", (req, res) => {
    res.render("create.ejs", {
        title: postTitle,
        text: postDescription
    })
})

app.post("/overview", (req, res) => {
    res.render("overview.ejs", {
        title: postTitle,
        text: postDescription,
        counter: postCounter
    })
    console.log("overview.ejs posted")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})