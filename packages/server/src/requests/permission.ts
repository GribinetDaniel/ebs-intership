import express from 'express';
import jwt from 'jsonwebtoken';
import { Token } from '../types';
import { mainAxios } from '../utils';
import { body, check, validationResult } from 'express-validator';

const secret = process.env.SECRET!;
const router = express.Router();

// router.use('/users', (req, res, next) => {
//   let token = req.headers.authorization!;
//   let decoded = jwt.verify(token, secret) as Token;
//   if (decoded.permission == 'admin') next();
//   else res.status(403).json({ message: 'Acces denied' });
// });

router.post('/posts', async (req, res, next) => {
  let token = req.headers.authorization!;
  if (token == null) res.status(401).json({ message: 'unauthenticated' });
  else {
    let decoded = jwt.verify(token, secret) as Token;
    req.body.userId = decoded.id;
    next();
  }
});

router.patch(
  '/posts/:id',
  check('title', 'Title is required').notEmpty(),
  check('body', 'Body is required').notEmpty(),
  async (req, res, next) => {
    let token = req.headers.authorization!;
    if (token == null) res.status(401).json({ message: 'unauthenticated' });
    else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let decoded = jwt.verify(token, secret) as Token;
      if (decoded.permission == 'admin') next();
      else {
        let data = (await mainAxios.get(`${req.path}`)).data;
        if (decoded.id == data.userId) next();
        else res.status(403).json({ message: 'Acces denied' });
      }
    }
  }
);

router.delete('/posts/:id', async (req, res, next) => {
  if (req.headers.authorization == null)
    res.status(401).json({ message: 'unauthenticated' });
  else {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, secret) as Token;
    if (decoded.permission == 'admin') next();
    else {
      let data = (await mainAxios.get(`${req.path}`)).data;
      if (decoded.id == data.userId) next();
      else res.status(403).json({ message: 'Acces denied' });
    }
  }
});

export default router;
