const pool = require("../../config/db");
const {
  getAllQuery,
  getByIdQuery,
  updateByIdQuery,
  deleteByIdQuery,
  insertToTableQuery,
  deleteAllQuery,
} = require("../../utils/common.queries");
const { getBodyValues } = require("../../utils/common.helper");
const { TABLE_NAME } = require("../../utils/constants");

const getLanguages = async (req, res) => {
  const getLanguagesQuery = await getAllQuery(TABLE_NAME.language);
  const result = await pool.query(getLanguagesQuery);
  if (result.error) {
    throw result.error;
  }
  console.log("Success: getLanguages", result.rowCount);
  res.status(200).json(result.rows);
};

const getLanguagesById = async (req, res) => {
  const id = parseInt(req.params.id);
  const getLanguagesByIdQuery = await getByIdQuery(id, TABLE_NAME.language);
  const result = await pool.query(getLanguagesByIdQuery);
  if (result.error) {
    throw result.error;
  }
  console.log("Success: getLanguagesById", result.rowCount);
  if (result.rowCount == 0) {
    res.status(404).send("Language not found");
    return;
  }
  res.status(200).json(result.rows);
};

const insertLanguage = async (req, res) => {
    const insertLanguageQuery = await insertToTableQuery(req.body, TABLE_NAME.language);

    const values = await getBodyValues(req.body);
    const result = await pool.query(insertLanguageQuery, values);
    
  if (result.error) {
    throw result.error;
  }
  console.log("Success: insertLanguage", result.rowCount);
  res.status(201).send("Language inserted successfully");
};

const updateLanguageById = async (req, res) => {
  const id = parseInt(req.params.id);
  const getLanguagesByIdQuery = await getByIdQuery(id, TABLE_NAME.language);
  const isPresent = await pool.query(getLanguagesByIdQuery);
  if (isPresent.rowCount == 0) {
    res.status(404).send("Language not found");
    return;
  }
  const updateLanguageByIdQuery = await updateByIdQuery(id, req.body, TABLE_NAME.language);

  const values = await getBodyValues(req.body);
  const result = await pool.query(updateLanguageByIdQuery, values);
  if (result.error) {
    throw result.error;
  }
  console.log("Success: updateLanguageById", result.rowCount);
  res.status(200).send("Language updated successfully");
};

const patchUpdateLanguageById = async (req, res) => {
  const id = parseInt(req.params.id);
  const getLanguagesByIdQuery = await getByIdQuery(id, TABLE_NAME.language);
  const isPresent = await pool.query(getLanguagesByIdQuery);
  if (isPresent.rowCount == 0) {
    res.status(404).send("Language not found");
    return;
  }
  const patchQuery = await updateByIdQuery(id, req.body, TABLE_NAME.language);

  const values = await getBodyValues(req.body);
  const result = await pool.query(patchQuery, values);
  if (result.error) {
    throw result.error;
  }
  console.log("Success: patchUpdateLanguageById", result.rowCount);
  res.status(200).send("Language updated successfully");
};

const deleteLanguageById = async (req, res) => {
  const id = parseInt(req.params.id);
  const getLanguagesByIdQuery = await getByIdQuery(id, TABLE_NAME.language);
  const isPresent = await pool.query(getLanguagesByIdQuery);
  if (isPresent.rowCount == 0) {
    res.status(404).send("Language not found");
    return;
  }
  const deleteLanguageQuery = await deleteByIdQuery(id, TABLE_NAME.language);
  const result = await pool.query(deleteLanguageQuery);
  if (result.error) {
    throw result.error;
  }
  console.log("Success: deleteLanguageById", result.rowCount);
  res.status(200).send("Language deleted successfully");
};

const deleteAllLanguage = async (req, res) => {
    const deleteLanguagesQuery = await deleteAllQuery(TABLE_NAME.language);
    const result = await pool.query(deleteLanguagesQuery);
    if (result.error) {
      throw result.error;
    }
    console.log("Success: deleteAllLanguage", result.rowCount);
    res.status(200).send("All Language deleted successfully");
};

module.exports = {
  getLanguages,
  getLanguagesById,
  insertLanguage,
  updateLanguageById,
  patchUpdateLanguageById,
  deleteLanguageById,
  deleteAllLanguage
};
