// routes/accountRoutes.ts
import express from 'express';
import { getAccounts, getAccountById, createAccount, updateAccount, deleteAccount } from '../controllers/accountController';
import { protect } from '../middleware/authMiddleware'; // Assuming you have an auth middleware

const router = express.Router();

router.route('/')
  .get(protect, getAccounts)
  .post(protect, createAccount);

router.route('/:id')
  .get(protect, getAccountById)
  .patch(protect, updateAccount)
  .delete(protect, deleteAccount);

export default router;
