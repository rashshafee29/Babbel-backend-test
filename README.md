# Babbel-backend-test

## _Steps to run_
1. Copy .env.example file in project directory and rename it to .env
2. run `npm i` to install all dependencies
3. Start postgres server
4. run `npm run start` to start the project

## _Api Documentation_
## User

**_User signup_**

*URL* : `/api/v1/users`

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

**_Update profile image_**

*URL*: `/api/v1/users/:id/image`

*Method*: `PUT`

*Authentication*: `required` **Bearer token**

*Body* : `file upload`

----
