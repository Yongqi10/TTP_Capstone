const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/transactions", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;
    const { f_id_fk, tr_total } = req.body;

    const order = await pool.query(
      "INSERT INTO t_transactions (f_id_fk, u_id_fk, tr_total) VALUES ($1,$2,$3) RETURNING *",
      [f_id_fk, u_id_fk, tr_total]
    );

    res.json(order.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.get("/transactions", async (req, res) => {
  try {
    const order = await pool.query("SELECT * FROM t_transactions");
    res.json(order.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/transactions/:f_id_fk", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;
    const { f_id_fk } = req.params;

    const deleteOrder = await pool.query(
      "DELETE FROM t_transactions WHERE  f_id_fk = $1 AND u_id_fk = $2",
      [f_id_fk, u_id_fk]
    );
    res.json("item delete!");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
