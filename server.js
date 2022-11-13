require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/user/routes');
const lessonRoutes = require('./src/lesson/routes');
const languageRoutes = require('./src/language/routes');
const courseRoutes = require('./src/course/routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/languages', languageRoutes);
app.use('/api/v1/courses', courseRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message: "Something went wrong",
    });
});

// Listen on pc port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
