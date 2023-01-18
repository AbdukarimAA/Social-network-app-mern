import express, {Request, Response} from "express";
import {getUser, getUserFriends, addRemoveFriend, deleteUser, getAllUsers, updateUser, dateCreated, changePassword} from '../controllers/user.controller.js';
import {auth} from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/getUser/:id', auth, getUser);
router.get('/getUserFriends/:id', auth, getUserFriends);
router.get('/getAllUsers', auth, getAllUsers);
router.get('/statistics', auth, dateCreated);
router.put('/addRemoveFriend/:id/:friendId', auth, addRemoveFriend);
router.put('/updateUser/:id', auth, updateUser);
router.put('/changePassword/:id', auth, changePassword);
router.delete('/deleteUser/:id', auth, deleteUser);
export default router;