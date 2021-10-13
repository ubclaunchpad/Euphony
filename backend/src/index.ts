import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORTNUM;

app.listen(port, () => {
	console.log(`started on port ${port}`);
});
