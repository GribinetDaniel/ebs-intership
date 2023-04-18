import express from 'express';
import { body, check } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Token } from '../types';
import { mainAxios } from '../utils';
import { User } from '../types';

const router = express.Router();
const secret = process.env.SECRET!;

router.get('/', async (req, res) => {
  if (req.headers.authorization == null)
    res.status(401).json({ message: 'Unauthenticated' });
  else {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, secret) as Token;
    let id = decoded.id;
    let user = (await mainAxios.get(`users/${id}`)).data;
    res.json(user);
  }
});

router.patch(
  '/',
  body('email')
    .isEmail()
    .custom(async (value) => {
      let users = (await mainAxios.get('/users')).data;
      let isUse = users.find((elem: User) => elem.email === value);
      if (isUse) throw new Error('Email already in use');
    }),
  body('username').custom(async (value) => {
    let users = (await mainAxios.get('/users')).data;
    let isUse = users.find((elem: User) => elem.username === value);
    if (isUse) throw new Error('Username already in use');
  }),

  check('name', 'Name is required').notEmpty(),
  check('username', 'Username is required').notEmpty(),
  check('email', 'Email is required').notEmpty(),
  check('city', 'City is required').notEmpty(),
  async (req, res) => {
    let token = req.headers.authorization!;
    let decoded = jwt.verify(token, secret) as Token;
    let id = decoded.id;
    let user = (await mainAxios.patch(`users/${id}`, req.body)).data;
    res.json(user);
  }
);

export default router;
