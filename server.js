const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');

//Middleware
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} - ${request.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log +'\n', (error) =>{
        if (error){
            console.log('Unable to append to server.log');
        }
    })
    next();
});

//app.use((request, response, next) => {
//    response.render('maintenance.hbs', {
//        pageTitle: 'Maintenance Page',
//        warningMessage: 'Estamos sob manutenção.'       
//    });
//});

app.use(express.static(__dirname + '/public'));

//Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (pText) => {
    return pText.toUpperCase();
});
//Fim dos Helpers


app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: 'Sei lá cara, seja bem vindo.'       
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port,() => {
    console.log(`Servidor rodando na porta: ${port} `);
});