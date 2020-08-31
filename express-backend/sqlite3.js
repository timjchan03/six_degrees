var sqlite3 = require("sqlite3").verbose();

exports.searchArtist = function (input, callback) {
  var array = [];
  let db = new sqlite3.Database("./artist_info.db");
  let sql = `SELECT * FROM artist_info WHERE name LIKE ? LIMIT 5`;
  let artist_name = [];
  if (input != "") {
    artist_name.push(input.concat("%"));
  } else {
    artist_name.push(input);
  }
  db.all(sql, artist_name, function (err, rows) {
    if (err) {
      console.log("error");
      return;
    }
    for (let i = 0; i < rows.length; i++) {
      array.push(rows[i]);
    }
    db.close();
    callback(array);
  });
};
