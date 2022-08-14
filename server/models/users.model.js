const query = require("../config/database.config");
const bcrypt = require("bcrypt");

async function register(username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);

    if (user) {
      return { success: false, data: null, error: "Username already taken" };
    }
    const hashed = await bcrypt.hash(password, 10);

    await query("INSERT INTO users (password, username) VALUES (?,?)", [
      hashed,
      username,
    ]);

    return { success: true, data: "Successfully registered!", error: null };
  } catch (err) {
    return { success: false, data: null, error: "Something went wrong." };
  }
}
async function login(username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);

    if (!user) {
      return { success: false, data: null, error: "Username invalid" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { success: false, data: null, error: "Password invalid" };
    }
    return {
      success: true,
      data: { username: user.username, id: user.id },
      error: null,
    };
  } catch (err) {
    return { success: false, data: null, error: "Something went wrong." };
  }
}

module.exports.login = login;
module.exports.register = register;
