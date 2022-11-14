const pool = require("../../config/db");
const _ = require('underscore');
const {
  getAllQuery,
  getByIdQuery,
  updateByIdQuery,
  deleteByIdQuery,
  insertToTableQuery,
  findByFieldInTableQuery,
} = require("../../utils/common.queries");
const { getBodyValues, makeHash, getToken } = require("../../utils/common.helper");
const { TABLE_NAME } = require("../../utils/constants");

const getCourses = async (req, res) => {
    try {
        const getCoursesQuery = await getAllQuery(TABLE_NAME.course);
        const result = await pool.query(getCoursesQuery);
        if (result.error) {
            throw result.error;
        }
        console.log('Success: getCourses', result.rowCount);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log('Failed: getCourses', err.detail);
        res.status(403).send(err.detail)
    }
};

const getCoursesOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const getCourseOfUserQuery = await findByFieldInTableQuery('owner_id', userId, TABLE_NAME.course);
        const result = await pool.query(getCourseOfUserQuery);
        if (result.error) {
            throw result.error;
        }
        console.log('Success: getCoursesOfUser', result.rowCount);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log('Failed: getCoursesOfUser', err.detail);
        res.status(403).send(err.detail)
    }
};

const insertCourse = async (req, res) => {
    try {
        const userId = req.params.id;
        req.body.owner_id = userId;
        const { lesson_list } = req.body;
        req.body.lesson_list = _.map(lesson_list, num => num).sort();
        const insertCourseQuery = await insertToTableQuery(req.body, TABLE_NAME.course);
        const values = await getBodyValues(req.body);

        const result = await pool.query(insertCourseQuery, values);

        if (result.error) {
            throw error;
        }
        console.log('Success: insertCourse', result.rowCount);
        res.status(201).json({ message: 'Course added', courseDetails: result.rows[0] });
    } catch (err) {
        console.log('Failed: insertCourse', err);
        res.status(403).send(err);
    }
};

const updateCourseById = async (req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const getCourseByIdQuery = await getByIdQuery(courseId, TABLE_NAME.course);
        const { lesson_list } = req.body;
        if (lesson_list)
            req.body.lesson_list = _.map(lesson_list, num => num).sort();
        const isPresent = await pool.query(getCourseByIdQuery);
        if (isPresent.rowCount == 0) {
            res.status(404).send('Course not found');
            return;
        }
        const patchUpdate = await updateByIdQuery(courseId, req.body, TABLE_NAME.course);
        const values = await getBodyValues(req.body);
        const result = await pool.query(patchUpdate, values);
        if (result.error) {
            throw result.error;
        }
        console.log('Success: updateCourseById', result.rowCount);
        res.status(200).json({ message: 'Course updated' });
    } catch (err) {
        console.log('Failed: updateCourseById', err);
        res.status(403).send(err);
    }
};

const deleteCourseById = async (req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const getCourseByIdQuery = await getByIdQuery(courseId, TABLE_NAME.course);
        const isPresent = await pool.query(getCourseByIdQuery);
        if (isPresent.rowCount == 0) {
            res.status(404).send('Course not found');
            return;
        }
        const deleteCourseByIdQuery = await deleteByIdQuery(courseId, TABLE_NAME.course);
        const result = await pool.query(deleteCourseByIdQuery);
        if (result.error) {
            throw result.error;
        }
        console.log('Success: deleteCourseById', result.rowCount);
        res.status(200).send('Course Deleted');
    } catch (err) {
        console.log('Failed: deleteCourseById', err);
        res.status(403).send(err);
    }
};

module.exports = {
    getCourses,
    getCoursesOfUser,
    insertCourse,
    updateCourseById,
    deleteCourseById
}