const pool = require("../../config/db");
const {
  getAllQuery,
  getByIdQuery,
  updateByIdQuery,
  deleteByIdQuery,
  insertToTableQuery,
} = require("../../utils/common.queries");
const { getBodyValues } = require("../../utils/common.helper");

const getLessons = async (req, res) => {
    const getLessonsQuery = await getAllQuery('lesson');
    const result = await pool.query(getLessonsQuery);
    if (result.error) {
        throw error;
    }
    console.log("Success: getLessons", result.rowCount);
    res.status(200).json(result.rows);
};

const getLessonById = async (req, res) => {
    const id = parseInt(req.params.id);
    const getLessonByIdQuery = await getByIdQuery(id, 'lesson');
    const result = await pool.query(getLessonByIdQuery);
    if (result.error) {
        throw error;
    }
    console.log("Success: getLessonById", result.rowCount);
    if (result.rowCount == 0) {
        res.status(404).send("Lesson not found");
        return;
    }
    res.status(200).json(result.rows);
};

const insertLesson = async (req, res) => {
    const insertLessonQuery = await insertToTableQuery(req.body, 'lesson');

    const values = await getBodyValues(req.body);
    const result = await pool.query(insertLessonQuery, values);
    if (result.error) {
        throw error;
    }
    console.log("Success: insertLesson", result.rowCount);
    res.status(201).send("Lesson inserted successfully");
};

const updateLessonById = async (req, res) => {
    const id = parseInt(req.params.id);
    const getLessonByIdQuery = await getByIdQuery(id, 'lesson');
    const isPresent = await pool.query(getLessonByIdQuery);
    if (isPresent.rowCount == 0) {
        res.status(404).send('Lesson not found');
        return;
    }

    const updateLessonByIdQuery = await updateByIdQuery(id, req.body, 'lesson');
    const values = await getBodyValues(req.body);
    const result = await pool.query(updateLessonByIdQuery, values);
    if (result.error) {
        throw error;
    }
    console.log("Success: updateLessonById", result.rowCount);
    res.status(200).send('Lesson updated successfully');
};

const patchUpdateLessonById = async (req, res) => {
    const id = parseInt(req.params.id);
    const getLessonByIdQuery = await getByIdQuery(id, 'lesson');
    const isPresent = await pool.query(getLessonByIdQuery);
    if (isPresent.rowCount == 0) {
        res.status(404).send('Lesson not found');
        return;
    }

    const patchUpdateLessonByIdQuery = await updateByIdQuery(id, req.body, 'lesson');
    const values = await getBodyValues(req.body);
    const result = await pool.query(patchUpdateLessonByIdQuery, values);
    if (result.error) {
        throw error;
    }
    console.log("Success: patchUpdateLessonById", result.rowCount);
    res.status(200).send('Lesson updated successfully');
};

const deleteLessonById = async (req, res) => {
    const id = parseInt(req.params.id);
    const getLessonByIdQuery = await getByIdQuery(id, 'lesson');
    const isPresent = await pool.query(getLessonByIdQuery);
    if (isPresent.rowCount == 0) {
        res.status(404).send('Lesson not found');
        return;
    }
    const deleteLessonByIdQuery = await deleteByIdQuery(id, 'lesson');
    const result = await pool.query(deleteLessonByIdQuery);
    if (result.error) {
        throw error;
    }
    console.log('Success: deleteLessonById', result.rowCount);
    res.status(200).send('Lesson deleted successfully');
}

module.exports = {
    getLessons,
    getLessonById,
    insertLesson,
    updateLessonById,
    patchUpdateLessonById,
    deleteLessonById
}