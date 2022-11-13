const createUserTableQuery = `CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);`

const createLanguageTableQuery = `CREATE TABLE IF NOT EXISTS "language"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);`

const createLessonTableQuery = `CREATE TABLE IF NOT EXISTS "lesson"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "lesson_text" TEXT NOT NULL
);`

const createCourseTableQuery = `CREATE TABLE IF NOT EXISTS "course"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active_lesson" INT NOT NULL,
    "lesson_list" integer[] NOT NULL
);`

module.exports = {
    createUserTableQuery,
    createLanguageTableQuery,
    createLessonTableQuery,
    createCourseTableQuery
}