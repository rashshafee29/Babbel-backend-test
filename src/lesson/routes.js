const { Router } = require('express');
const { getLessons, getLessonById, insertLesson, updateLessonById, patchUpdateLessonById, deleteLessonById } = require('./controller');

const router = Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/', insertLesson);
router.put('/:id', updateLessonById);
router.patch('/:id', patchUpdateLessonById);
router.delete('/:id', deleteLessonById);

module.exports = router;