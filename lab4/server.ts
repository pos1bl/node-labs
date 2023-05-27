import express, { Request, Response } from 'express';

interface User {
  id: number;
  username: string;
  name?: string;
}

let users: User[] = [];
let nextUserId = 1;

const app = express();
app.use(express.json());

// Створення користувача
app.post('/users', (req: Request, res: Response) => {
  const { username, name } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const newUser: User = {
    id: nextUserId++,
    username,
    name,
  };

  users.push(newUser);

  return res.status(201).json(newUser);
});

// Отримання даних користувача за його id
app.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
});

// Список користувачів
app.get('/users', (_req: Request, res: Response) => {
  return res.json(users);
});

// Оновлення даних користувача за його id
app.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.username = username || user.username;
  user.name = name || user.name;

  return res.json(user);
});

// Видалення користувача за його id
app.delete('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUsers = users.splice(index, 1);

  return res.json(deletedUsers[0]);
});

app.get('/', (_req: Request, res: Response) => {
  return res.send('Hello, World!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
