const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const authenticationMiddleware = require('../middleware/authentication.middleware');
const { getUserById, insertUser, updateUserById, deleteUserById, getUsers, loginUser, updateProfileImage } = require('./controller');

const router = Router();

const upload = multer({
    dest:'../../upload/images',
})

// router.get('/', getUsers);
router.get('/:id',
    authenticationMiddleware,
    getUserById);
router.post('/', insertUser);
router.put('/:id',
    authenticationMiddleware,
    updateUserById)
router.delete('/:id',
    authenticationMiddleware,
    deleteUserById);
router.post('/login', loginUser);
router.put('/:id/image', upload.single('profile_image'),
    authenticationMiddleware,
    updateProfileImage);

module.exports = router;