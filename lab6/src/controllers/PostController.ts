import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../entity/Post';

export const createPost = async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const { userId, title, text } = req.body;
    const post = postRepository.create({ userId, title, text });
    await postRepository.save(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const { userId } = req.params;
    const posts = await postRepository.find({ where: { userId: +userId } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
