var express = require('express');
var app = express();
var db = require('./src/services/dbService');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.send('Hello World!');
});



app.post('/createEmployee', async function (req, res) {
    const data = await db.createEmployee(req.body);
    if (data.error) {
        res.statusCode = 500;
    }
    res.send(data);
});

app.post('/createBulkEmployee', async function (req, res) {
    const data = await db.createBulkEmployee(req.body);
    if (data.error) {
        res.statusCode = 500;
    }
    res.send(data);
});

app.get('/getEmployeeDetails', async function (req, res) {

    const data = await db.getAllEmployeeDetails();
    if (data.error) {
        res.statusCode = 500;
    }
    res.send(data);
})

app.put('/updateEmployee', async function (req, res) {

    const data = await db.updateEmployee(req.body)
    if (data.error) {
        res.statusCode = 500;
    } else if(data.code){
        res.statusCode = data.code;
    }
    res.send(data);

});

app.delete('/deleteEmployee/:id', async function (req, res) {
    const { id } = req.params;
    const data = await db.deleteEmployee(id);
    if (data.error) {
        res.statusCode = 500;
    } else if(data.code){
        res.statusCode = data.code;
    }
    res.send(data);
})


var server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = server;