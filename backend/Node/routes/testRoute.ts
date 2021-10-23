import express from 'express';
const router = express.Router();

router.get('helloFromTest', (_, res) => {
	res.send('hello from test!');
});

module.exports = router;
