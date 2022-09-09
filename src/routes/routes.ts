import express from 'express';
import controller from '../controllers/user';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/api/validate', verifyToken, controller.validateToken);
router.post('/api/register', verifyToken, controller.register);
router.post('/api/login', controller.login);
router.get('/api/users', verifyToken ,controller.getAllUsers);


export default router