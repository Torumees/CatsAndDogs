const express = require('express');
const ejs = require('ejs');
const { default: axios } = require('axios');
const { response } = require('express');
const app = express();

app.set('view engine', ejs);
app.use(express.static('public'));

app.get('/', (req, res)=> {
    //https://api.thecatapi.com/v1/images/search
    let defaultImageUrl = {
        url: ""
    };
    
    res.render('index.ejs', {imageSrc: defaultImageUrl});
});

app.post('/get-cat', (req, res) => {
    const url = "https://api.thecatapi.com/v1/images/search";

    axios.get(url)
    .then(response => {
        let randomImageUrl = {
            url: response.data[0].url
        };
        
        res.render('index.ejs', {imageSrc: randomImageUrl})

    })
});

app.post('/get-dog', (req, res) => {
    const url = "https://dog.ceo/api/breeds/image/random";

    axios.get(url)
    .then(response => {
        let randomImageUrl = {
            url: response.data.message
        };
        
        res.render('index.ejs', {imageSrc: randomImageUrl})

    })
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});