const router = require("express").Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const Generator = require('../utils/Generator')

router.post("/Register", validInfo, async (req, res) => {
  try {
    const { u_email, u_password, u_name, u_is_employee } = req.body;

    //check user exist
    const ifExist = await pool.query(
      "SELECT * FROM t_user WHERE u_email = $1",
      [u_email]
    );

    if (ifExist.rows.length !== 0) {
      return res.status(401).json("user exist");
    }

    //Bcrypt the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(u_password, salt);

    const newUser = await pool.query(
      "INSERT INTO t_user (u_email,u_password,u_name,u_is_employee) VALUES ($1,$2,$3,$4) RETURNING *",
      [u_email, hashedPassword, u_name,u_is_employee]
    );

    const token = Generator(newUser.rows[0].u_id,newUser.rows[0].u_is_employee)
    res.json({token});

  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;
