const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Docker!');
});

app.get('/earth', (req, res) => {
    res.send('Hello from Hell');
});

app.listen(3000, () => {
    console.log('API running on port 3000');
});