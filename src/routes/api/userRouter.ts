import express from 'express';
import users from '../../controllers/users';

const router = express.Router();

router.post('/create', users.createUser);
router.get('/:userid', users.getUserById);
router.post('/authenticate', users.authenticateUser);

export default router;