import express from "express";
import jwt from "jsonwebtoken";
import { Token, User } from "../types";
import { mainAxios } from "../utils";
import { body, check, validationResult } from "express-validator";

const secret = process.env.SECRET!;
const router = express.Router();

router.patch("/users/:id", async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 next();
});

router.post(
 "/users",
 body("email")
  .isEmail()
  .custom(async (value, { req }) => {
   let users = (await mainAxios.get("/users")).data;
   let isUse = users.find(
    (elem: User) => elem.email === value && elem.id != req.body.id
   );
   if (isUse) throw new Error("Email already in use");
   else return true;
  }),
 body("username").custom(async (value, { req }) => {
  let users = (await mainAxios.get("/users")).data;
  let isUse = users.find(
   (elem: User) => elem.username === value && elem.id != req.body.id
  );
  if (isUse) throw new Error("Username already in use");
  else return true;
 }),
 body("permission").custom(value => {
  if (value !== "user" && value !== "admin")
   throw new Error("Must be user or admin");
  else return true;
 }),
 body("password").isLength({ min: 5 }),
 check("password", "Password is required").notEmpty(),
 check("permission", "Permission is required").notEmpty(),
 check("name", "Name is required").notEmpty(),
 check("username", "Username is required").notEmpty(),
 check("email", "Email is required").notEmpty(),
 async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }
  next();
 }
);

router.post(
 "/posts",
 check("title", "Title is required").notEmpty(),
 check("body", "Body is required").notEmpty(),
 async (req, res, next) => {
  let token = req.headers.authorization!;
  if (token == null) res.status(401).json({ message: "unauthenticated" });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  } else {
   let decoded = jwt.verify(token, secret) as Token;
   req.body.userId = decoded.id;
   next();
  }
 }
);

// router.patch(
//  "/posts/:id",
//  check("title", "Title is required").notEmpty(),
//  check("body", "Body is required").notEmpty(),
//  async (req, res, next) => {
//   let token = req.headers.authorization!;
//   if (token == null) res.status(401).json({ message: "unauthenticated" });
//   else {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//    }
//    let decoded = jwt.verify(token, secret) as Token;
//    if (decoded.permission == "admin") next();
//    else {
//     let data = (await mainAxios.get(`${req.path}`)).data;
//     if (decoded.id == data.userId) next();
//     else res.status(403).json({ message: "Acces denied" });
//    }
//   }
//  }
// );

router.delete("/posts/:id", async (req, res, next) => {
 if (req.headers.authorization == null)
  res.status(401).json({ message: "unauthenticated" });
 else {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, secret) as Token;
  if (decoded.permission == "admin") next();
  else {
   let data = (await mainAxios.get(`${req.path}`)).data;
   if (decoded.id == data.userId) next();
   else res.status(403).json({ message: "Acces denied" });
  }
 }
});

export default router;
