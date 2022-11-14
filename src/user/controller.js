const pool = require("../../config/db");
const fs = require('fs');
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

const getUsers = async (req, res) => {
  try {
    const getUsersQuery = await getAllQuery(TABLE_NAME.user);
    const result = await pool.query(getUsersQuery);
    if (result.error) {
      throw result.error;
    }
    console.log('Success: getUsers', result.rowCount);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log('Failed: getUsers', err.detail);
    res.status(403).send(err.detail);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getUserByIdQuery = await getByIdQuery(id, TABLE_NAME.user);
    console.log('getUserByIdQuery', getUserByIdQuery);
    const result = await pool.query(getUserByIdQuery);
    if (result.error) {
      throw result.error;
    }
    console.log('Success: getUserById', result.rowCount);
    if (result.rowCount == 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.log('Failed: getUserById', err.detail);
    res.status(403).send(err.detail);
  }
};

const insertUser = async (req, res) => {
  try {
      const insertUserQuery = await insertToTableQuery(req.body, TABLE_NAME.user);

      const { password } = req.body;
      if (password) {
        req.body.password = makeHash(password);
      }
      
      const values = await getBodyValues(req.body);

      const result = await pool.query(insertUserQuery, values);
      console.log('result', result);
      if (result.error) {
        throw result.error;
      }
    
      let jwtToken = await getToken(req.body, result.rows[0]);
      console.log('Success: insertUser', result.rowCount);
      res.status(201).json({ message: 'User created!', userId: result.rows[0].id, token_type: 'Bearer', token: jwtToken });
  } catch (err) {
    console.log('Failed: insertUser', err.detail);
    res.status(403).send(err.detail);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getUserByIdQuery = await getByIdQuery(id, TABLE_NAME.user);
    const isPresent = await pool.query(getUserByIdQuery);
    if (isPresent.rowCount == 0) {
      res.status(404).send('User not found');
      return;
    }
  
    const updateUserByIdQuery = await updateByIdQuery(id, req.body, TABLE_NAME.user);
    const { password } = req.body;
    if (password) {
      req.body.password = makeHash(password);
    }
    
    const values = await getBodyValues(req.body);
    const result = await pool.query(updateUserByIdQuery, values);
    if (result.error) {
      throw result.error;
    }
    console.log('Success: updateUserById', result.rowCount);
    res.status(200).send('User updated successfully');
  } catch (err) {
    console.log('Failed: updateUserById', err.detail);
    res.status(403).send(err.detail);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getUserByIdQuery = await getByIdQuery(id, TABLE_NAME.user);
    const isPresent = await pool.query(getUserByIdQuery);
    if (isPresent.rowCount == 0) {
      res.status(404).send('User not found');
      return;
    }
    const deleteUserByIdQuery = await deleteByIdQuery(id, TABLE_NAME.user);
    const result = await pool.query(deleteUserByIdQuery);
    if (result.error) {
      throw result.error;
    }
    console.log('Success: deleteUserById', result.rowCount);
    res.status(200).send('User deleted successfully');
  } catch (err) {
    console.log('Failed: deleteUserById', err.detail);
    res.status(403).send(err.detail);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUserQuery = await findByFieldInTableQuery('username', username, TABLE_NAME.user);
    const result = await pool.query(findUserQuery);
    if (result.rowCount == 0) {
      res.status(404).send('User not found');
    }
    const userObj = result.rows[0];
    const passHash = makeHash(password);
    if (passHash != userObj.password) {
      res.status(401).json({ message: 'username or password wrong!' });
    }
    console.log('userObj', userObj);
    let jwtToken = await getToken(userObj, userObj);
    console.log('Success: loginUser', result.rowCount);
    res.status(201).json({ message: 'User login successfully!', userId: result.rows[0].id, token_type: 'Bearer', token: jwtToken });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getUserByIdQuery = await getByIdQuery(id, TABLE_NAME.user);
    const isPresent = await pool.query(getUserByIdQuery);
    if (isPresent.rowCount == 0) {
      res.status(404).send('User not found');
      return;
    }
    console.log('image', req.file);

    let bsImgString = fs.readFileSync(req.file.path, {encoding: 'base64'});
    const body = {
      profile_image: bsImgString
    }
    const updateImageQuery = await updateByIdQuery(id, body, TABLE_NAME.user);
    console.log('updateImageQuery', updateImageQuery);
    const values = await getBodyValues(body);
    const result = await pool.query(updateImageQuery, values);
    if (result.error) {
      throw result.error;
    }
    console.log('Success: updateProfileImage', result.rowCount);
    res.status(200).send('Updated ProfileImage successfully');
  } catch (err) {
    console.log(err);
    res.status(403).json({ err });
  }
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUserById,
  deleteUserById,
  loginUser,
  updateProfileImage
}