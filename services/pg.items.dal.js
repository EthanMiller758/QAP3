const dal = require("./pg.myproject_db");

//get all items.

var getItems = function() {
  if(DEBUG) console.log("items.pg.dal.getItems()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id AS _id, name, description, price FROM public."Items" \
        ORDER BY id DESC LIMIT 7;`
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

// get items by their id.

var getItemByItemId = function(id) {
  if(DEBUG) console.log("items.pg.dal.getItemByItemId()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id AS _id, name, description, price FROM public."Items" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

// add an item.

var addItem = function(id, name, description, price) {
  if(DEBUG) console.log("items.pg.dal.addItem()");
  return new Promise(function(resolve, reject) {
    const sql = `INSERT INTO public."Items"(id, name, description, price) \
        VALUES ($1, $2, $3, $4);`;
    dal.query(sql, [id, name, description, price], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

// update items.

var patchItem = function(id, name, description, price) {
  if(DEBUG) console.log("items.pg.dal.patchItem()");
  return new Promise(function(resolve, reject) {
    const sql = `UPDATE public."Items" SET name=$2, description=$3, price=$4 WHERE id=$1;`;
    dal.query(sql, [id, name, description, price], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

// delete an item.

var deleteItem = function(id) {
  if(DEBUG) console.log("items.pg.dal.deleteItems()");
  return new Promise(function(resolve, reject) {
    const sql = `DELETE FROM public."Items" WHERE id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports = {
  getItems,
  getItemByItemId,
  addItem,
  patchItem,
  deleteItem,
}