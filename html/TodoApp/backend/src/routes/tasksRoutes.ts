import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

export default router;
