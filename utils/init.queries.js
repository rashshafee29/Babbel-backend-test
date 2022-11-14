const { TABLE_NAME } = require("./constants")

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.user} (
    "id" SERIAL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "profile_image" TEXT
);`

const createLanguageTableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.language} (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);`

const createLessonTableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.lesson} (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "lesson_text" TEXT NOT NULL
);`

const createCourseTableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.course} (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active_lesson" INT NOT NULL,
    "lesson_list" integer[] NOT NULL,
    "owner_id" INT NOT NULL
);`

module.exports = {
    createUserTableQuery,
    createLanguageTableQuery,
    createLessonTableQuery,
    createCourseTableQuery
}