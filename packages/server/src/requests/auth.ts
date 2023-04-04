import express from 'express';
import { mainAxios, createToken } from '../utils';
import { User } from '../types';
import { body, validationResult, check } from 'express-validator';

const router = express.Router();

router.post('/login', async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  let users = (await mainAxios.get('/users')).data;
  let result = users.find((element: User) => {
    if (element.username == username && element.password == password)
      return element;
  });
  if (result == undefined)
    res.status(400).json({ message: 'Incorrect username or password' });
  else {
    let token = createToken(result);
    res.json({ token });
  }
});

router.post(
  '/register',
  body('email').custom(async (value) => {
    let users = (await mainAxios.get('/users')).data;
    let isUse = users.find((elem: User) => elem.email === value);
    if (isUse) throw new Error('Email already in use');
  }),
  body('password').isLength({ min: 5 }),
  body('username').custom(async (value) => {
    let users = (await mainAxios.get('/users')).data;
    let isUse = users.find((elem: User) => elem.username === value);
    if (isUse) throw new Error('Username already in use');
  }),
  check('name', 'Name is required').notEmpty(),
  check('username', 'Username is required').notEmpty(),
  check('email', 'Email is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user: User = req.body;
    let response = (await mainAxios.post('users', user)).data;
    let token = createToken(response);
    res.json({ token });
  }
);

export default router;
