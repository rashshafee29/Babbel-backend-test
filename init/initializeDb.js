const pool = require('../config/db');
const { createUserTableQuery, createLanguageTableQuery, createLessonTableQuery, createCourseTableQuery } = require('../utils/init.queries');

const initializeDb = async () => {
    try {
        const userTable = await pool.query(createUserTableQuery);
        const languageTable = await pool.query(createLanguageTableQuery);
        const lessonTable = await pool.query(createLessonTableQuery);
        const courseTable = await pool.query(createCourseTableQuery);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

initializeDb().then((result) => {
    if (result)
        console.log('Db created successfully', result);
    else
        console.log('Db creation failed');
}).catch((err) => {
    console.log('Db creation failed', err);
});
