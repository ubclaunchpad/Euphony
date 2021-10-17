import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORTNUM;

app.get('/hello', (_, res) => {
	res.send('Hello World');
});

app.listen(port, () => {
	console.log(`running on port ${port}`);
});
