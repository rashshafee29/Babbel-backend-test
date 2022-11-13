const _ = require("underscore");

exports.getAllQuery = async (tableName) => {
  let query = "SELECT * FROM " + tableName;
  return query;
};

exports.getByIdQuery = async (id, tableName) => {
  let query = "SELECT * FROM " + tableName + " WHERE id = " + id;
  return query;
};

exports.insertToTableQuery = async (cols, tableName) => {
    let query = ["INSERT INTO"];
    query.push(tableName);
    let keySet = [];
    let valSet = [];
    _.forEach(Object.keys(cols), (key, i) => {
        keySet.push(key);
        valSet.push("$" + (i + 1));
    });
    query.push("(");
    query.push(keySet.join(", "));
    query.push(") VALUES (");
    query.push(valSet.join(", "));
    query.push(")");
    return query.join(" ");
};

exports.deleteByIdQuery = async (id, tableName) => {
  let query = "DELETE FROM " + tableName + " WHERE id = " + id;
  return query;
};

exports.deleteAllQuery = async (tableName) => {
    let query = "DELETE FROM " + tableName;
    return query;
}

exports.updateByIdQuery = async (id, cols, tableName) => {
  let query = ["UPDATE"];
  query.push(tableName);
  query.push("SET");
  let set = [];
  _.forEach(Object.keys(cols), (key, i) => {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  query.push("WHERE id = " + id);
  return query.join(" ");
};
