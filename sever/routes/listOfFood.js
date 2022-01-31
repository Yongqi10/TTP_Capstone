const router = require("express").Router();
const pool = require("../db");

//get all food
router.get("/Food", async (req, res) => {
  try {
    const listOfFood = await pool.query("SELECT * FROM t_food");

    res.json(listOfFood.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



//get the type of food
router.get('/Food/:type',async (req,res)=>{

    try {
      const {type} = req.params
        const listOfFood = await pool.query("SELECT * FROM t_food WHERE f_category = $1",[type])
        res.json(listOfFood.rows)
    } catch (err) {
        res.status(500).json(err.message);
    }

})



module.exports = router;
