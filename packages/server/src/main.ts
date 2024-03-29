import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './requests/auth';
import account from './requests/account';
import perms from './requests/permission';

dotenv.config();
const port = process.env.PORT;
const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());
server.use('/auth', auth);
server.use('/account', account);
server.use('/', perms);
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});
