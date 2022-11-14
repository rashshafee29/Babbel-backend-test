const { Router } = require('express');
const authenticationMiddleware = require('../middleware/authentication.middleware');
const { getCourses, getCoursesOfUser, insertCourse, updateCourseById, deleteCourseById } = require('./controller');

const router = Router();

// router.get('/', getCourses);
router.get('/user/:id', getCoursesOfUser);
router.post('/user/:id',
    authenticationMiddleware,
    insertCourse);
router.patch('/user/:id/course/:courseId',
    authenticationMiddleware,
    updateCourseById);

router.delete('/user/:id/course/:courseId',
    authenticationMiddleware,
    deleteCourseById);

module.exports = router;