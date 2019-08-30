const express = require('express');
const app = express();
let bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

let db = [];


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/newtask', (request, response) => {
    response.sendFile(__dirname + '/newtask.html');
});

app.get('/listtasks', (request, response) => {
    response.render(__dirname + '/listtasks.html', {db: db});
});

app.post('/newtask', (request, response) => {
    let task = {
        name: request.body.name,
        date: request.body.date,
        desc: request.body.desc
    }

    db.push(task);

    response.send("<h1>Task Added!</h1> <a href='/'>Home</a>");
});

app.listen(8080, () => {console.log('Server running')} );