import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;
const server = express();

server.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World!');
})

server.listen(port, () => {
	console.log(`Listening to port: ${port}`);
})
