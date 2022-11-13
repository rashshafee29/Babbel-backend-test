const { Router } = require('express');
const { getLanguages, getLanguagesById, insertLanguage, updateLanguageById, deleteLanguageById, patchUpdateLanguageById, deleteAllLanguage } = require('./controller');

const router = Router();

router.get('/', getLanguages);
router.get('/:id', getLanguagesById);
router.post('/', insertLanguage);
router.put('/:id', updateLanguageById);
router.patch('/:id', patchUpdateLanguageById);
router.delete('/:id', deleteLanguageById);
router.delete('/', deleteAllLanguage);

module.exports = router;