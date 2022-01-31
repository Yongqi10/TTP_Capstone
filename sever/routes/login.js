const router = require("express").Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const Generator = require("../utils/Generator");
const authorization = require("../middleware/authorization");

router.post("/Login", validInfo, async (req, res) => {
  try {
    const { u_email, u_password } = req.body;

    const user = await pool.query("SELECT * FROM t_user WHERE u_email = $1", [
      u_email,
    ]);

    //check user is in the db or not
    if (user.rows.length === 0) {
      return res.status(401).json("user is undefined");
    }

    // compare user input password to DB password
    const bcryptPassword = await bcrypt.compare(
      u_password,
      user.rows[0].u_password
    );

    if (!bcryptPassword) {
      return res.status(401).json("ERROR!! email or password is incorrect");
    }

    const token = Generator(user.rows[0].u_id, user.rows[0].u_type);
    
    res.json({ token });


  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//return true if the token is real
//this also can be use to check if the user is login or not
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
