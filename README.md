# Babbel-backend-test

## _Steps to run_
1. Copy `.env.example` file in project directory and rename it to `.env` and change fields according to local db setup
2. run `npm i` to install all dependencies
3. Start postgres server
4. run `npm start` to start the project

## _Api Documentation_
## User

**_User signup_**

*URL* : `/api/v1/users/`

*Method* : `POST`

*Body*

```json
{
    "first_name": "testFirstName",
    "last_name": "testLastName",
    "username": "testUserName",
    "password": "testPass"
}
```

----

**_User login_**

*URL*: `/api/v1/users/login`

*Method*: `POST`

*Body*

```json
{
    "username": "testUserName",
    "password": "testPass"
}
```

----

**_Get single user_**

*URL*: `/api/v1/users/:id`

*Method*: `GET`

*Authentication*: `required` **Bearer token**

----

**_Update user_**

*URL*: `/api/v1/users/:id`

*Method*: `PUT`

*Authentication*: `required` **Bearer token**

*Body*

```json
{
    "firstName": "changeFirstName"
}
```

----

**_Delete user_**

*URL*: `/api/v1/users/:id`

*Method*: `DELETE`

*Authentication*: `required` **Bearer token**

----

**_Update profile image_**

*URL*: `/api/v1/users/:id/image`

*Method*: `PUT`

*Authentication*: `required` **Bearer token**

*Body* : `file upload`

----

## Course

**_Create Course_**

*URL*: `/api/v1/courses/user/:id`

*Method*: `POST`

*Authentication*: `required` **Bearer token**

*Body*

```json
{
    "name": "course 1",
    "active_lesson": "2",
    "lesson_list": ["2", "3", "4", "5"]
}
```

----

**_Update Course_**

*URL*: `/api/v1/courses/user/:id/course/:courseId`

*Method*: `PATCH`

*Authentication*: `required` **Bearer token**

*Body*

```json
{
    "name": "course 2",
    "active_lesson": "6",
}
```

----

**_Delete Course_**

*URL*: `/api/v1/courses/user/:id/course/:courseId`

*Method*: `DELETE`

*Authentication*: `required` **Bearer token**

----

**_Get Courses of a user_**

*URL*: `/api/v1/courses/user/:id`

*Method*: `GET`

----

## Language

**_Add language_**

*URL*: `/api/v1/languages/`

*Method*: `POST`

*Body*

```json
{
    "name": "English",
    "code": "EN"
}
```

----

**_Update language_**

*URL*: `/api/v1/languages/:id`

*Method*: `PUT` or `PATCH`

*Body*

```json
{
    "name": "English",
    "code": "EN"
}
```

----

**_Get Single language_**

*URL*: `/api/v1/languages/:id`

*Method*: `GET`

----

**_Get all languages_**

*URL*: `/api/v1/languages/`

*Method*: `GET`

----

**_Delete single language_**

*URL*: `/api/v1/languages/:id`

*Method*: `DELETE`

----

**_Delete all language_**

*URL*: `/api/v1/languages/`

*Method*: `DELETE`

----

## Lesson

**_Add lesson_**

*URL*: `/api/v1/lessons/`

*Method*: `POST`

*Body*

```json
{
    "name": "lesson 1",
    "language": "EN",
    "lesson_text": "test lesson text"
}
```

----

**_Update lesson_**

*URL*: `/api/v1/lessons/:id`

*Method*: `PUT` or `PATCH`

*Body*

```json
{
    "lesson_text": "test lesson text updated"
}
```

----

**_Get Single lesson_**

*URL*: `/api/v1/lessons/:id`

*Method*: `GET`

----

**_Get all lessons_**

*URL*: `/api/v1/lessons/`

*Method*: `GET`

----

**_Delete single lesson_**

*URL*: `/api/v1/lessons/:id`

*Method*: `DELETE`

----


