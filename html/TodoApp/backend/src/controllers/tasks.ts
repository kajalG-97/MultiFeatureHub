import { Request, Response } from 'express';
import Task from '../models/taskModel';

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

const createTask = async (req: Request, res: Response) => {
  const { title, description, status, endDate } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: 'Title and description are required' });
    return;
  }

  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
      endDate: new Date(endDate),
      status,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { title, description, status, endDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found ' });
      return;
    }
    if (task.user.toString() !== req.user.id) {
      res.status(404).json({ message: 'You are not authorized to delete' });
      return;
    }

    // Update fields if provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if(endDate) task.endDate = new Date(endDate);

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found ' });
      return;
    }
    if (task.user.toString() !== req.user.id) {
      res.status(404).json({ message: 'You are not authorized to delete' });
      return;
    }
    await task.deleteOne({ _id: task._id });
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
