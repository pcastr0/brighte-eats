import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

dotenv.config();
const port = process.env.PORT;
const server = express();

server.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World!');
})

server.listen(port, () => {
	console.log(`Listening to port: ${port}`);
})
