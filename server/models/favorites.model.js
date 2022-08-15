const query = require("../config/database.config");

async function add(favorite) {
  try {
    let { insertId } = await query(
      "INSERT INTO favorites (book_id, user_id, title, pic) VALUES (?,?,?,?)",
      [favorite.book_id, favorite.user_id, favorite.title, favorite.pic]
    );
    return { success: true, data: { ...favorite, id: insertId }, error: null };
  } catch (err) {
    // console.log(err);
    return { success: false, data: null, error: "Something went wrong" };
  }
}

async function remove(book_id, user_id) {
  try {
    await query(
      "DELETE FROM favorites WHERE favorites.book_id = ? AND favorites.user_id = ?",
      [book_id, user_id]
    );
    return { success: true, data: "Successfully deleted", error: null };
  } catch (err) {
    return { success: false, data: null, error: "Something went wrong" };
  }
}

async function getByUser(user_id) {
  try {
    const favorites = await query(
      "SELECT * FROM favorites where favorites.user_id = ?",
      [user_id]
    );
    return { success: true, data: favorites, error: null };
  } catch (err) {
    console.log(err);
    return { success: false, data: null, error: "Something went wrong" };
  }
}

async function getAll() {
  try {
    const favorites = await query("SELECT FROM favorites");

    return { success: true, data: favorites, error: null };
  } catch (err) {
    return { success: false, data: null, error: "Something went wrong" };
  }
}

module.exports.add = add;
module.exports.remove = remove;
module.exports.getByUser = getByUser;
module.exports.getAll = getAll;
