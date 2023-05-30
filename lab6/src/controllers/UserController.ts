import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const { username, email, age, info, address } = req.body;
    const user = userRepository.create({ username, email, age, info, address });
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id: +id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const { id } = req.params;
    const { username, email, age, info, address } = req.body;
    const user = await userRepository.findOne({ where: { id: +id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.email = email;
    user.age = age;
    user.info = info;
    user.address = address;
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id: +id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await userRepository.remove(user);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
