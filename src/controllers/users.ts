import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { secret } from '../config/passport';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      err: `Required Fields not found: ${!username ? 'username' : ''} ${
        !password ? 'password' : ''
      }`,
    });
  }
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password,
  });
  newUser.save(function (error, model) {
    if (error) {
      res.status(400).send({ error });
      next();
    }
    return res.status(201).send(model.removePass());
  });
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userid } = req.params;
  return User.findById(userid)
    .select('-password')
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'NOT FOUND' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      err: `Required Fields not found: ${!username ? 'username' : ''} ${
        !password ? 'password' : ''
      }`,
    });
  }
  User.findOne({ username: username }, function (err: any, userModel: any) {
    if (err) return res.status(400).send(err);
    if (!userModel) return res.status(400).send({ err: 'Cannot find user' });
    return userModel.comparePassword(password, function (err: any, isMatch: boolean) {
      if (err) return res.status(400).send(err);
      if (!isMatch) {
        return res.status(401).send({ err: 'Unauthorized' });
      }
      const payload = { id: userModel._id };
      const token = jwt.sign(payload, secret);
      return res.send({ token });
    });
  });
};

export default { createUser, getUserById, authenticateUser };
