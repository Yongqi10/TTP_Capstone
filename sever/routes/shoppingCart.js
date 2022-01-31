const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/shoppingCart", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;

    const { f_id_fk, f_qty } = req.body;

    //check the food is exist
    const ifExist = await pool.query(
      "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
      [u_id_fk, f_id_fk]
    );
    if (ifExist.rows.length !== 0) {
      return res.status(401).json("Food exist");
    }

    const cart = await pool.query(
      "INSERT INTO t_cart (f_id_fk,u_id_fk,f_qty) VALUES ($1,$2,$3) RETURNING *",
      [f_id_fk, u_id_fk, f_qty]
    );
    res.json(cart.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/shoppingCart", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;
    const cart = await pool.query("select t_cart.f_id_fk, t_food.f_name, t_food.f_price, t_cart.f_qty FROM t_cart INNER JOIN t_food ON t_cart.f_id_fk=t_food.f_id WHERE t_cart.u_id_fk = $1;",[u_id_fk]);

  
  
    res.json(cart.rows)
    
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/shoppingCart/:f_id_fk", authorization, async (req, res) => {
  
  const u_id_fk = req.user;
  const { f_id_fk } = req.params;
  const { f_qty } = req.body;

  //check the food is exist
  const ifExist = await pool.query(
    "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
    [u_id_fk, f_id_fk]
  );
  if (ifExist.rows.length === 0) {
    return res.status(401).json("Food undefined");
  }

  const cart = await pool.query(
    "UPDATE t_cart set f_qty = $1 WHERE f_id_fk = $2 AND u_id_fk = $3",
    [f_qty, f_id_fk, u_id_fk]
  );
  res.json(`shoppingCart was updated!`);
});

router.delete("/shoppingCart/:f_id_fk", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;
    const { f_id_fk } = req.params;

    //check the food is exist
    const ifExist = await pool.query(
      "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
      [u_id_fk, f_id_fk]
    );
    if (ifExist.rows.length === 0) {
      return res.status(401).json("Food undefined");
    }

    const deleteCart = await pool.query(
      "DELETE FROM t_cart WHERE  f_id_fk = $1 AND u_id_fk = $2",
      [f_id_fk, u_id_fk]
    );
    res.json("item delete!");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/checkout',authorization,async (req,res)=>{


  try {

    const time  = await pool.query("SELECT CURRENT_TIMESTAMP");


 


    const u_id_fk = req.user;
    const cartItem = await pool.query("SELECT * FROM t_cart WHERE u_id_fk = $1",[u_id_fk])

    
    
    
    const order = cartItem.rows.map(async (item)=>{
      
      const price = await pool.query('SELECT f_price FROM t_food WHERE f_id = $1',[item.f_id_fk])
      let str = price.rows[0].f_price.substring(1) * item.f_qty
      
      const order = await pool.query("INSERT INTO t_orders (o_id, u_id_fk, f_id_fk, f_qty_fk, price) VALUES ($1, $2, $3 ,$4 ,$5) RETURNING *",
      [time.rows[0].current_timestamp, u_id_fk, item.f_id_fk, item.f_qty,str])
      return order;
    })
    
    
     const deleteCart = await pool.query(
       "DELETE FROM t_cart WHERE u_id_fk = $1",
       [u_id_fk]

     );
    
    
   console.log("DELETE ALL!!")

    res.json(cartItem.rows);
  } catch (err) {
    res.status(500).json(err.message)
  }


})
router.get('/orders',async(req,res)=>{

  try {

    const data = await pool.query("select * from t_orders");
    res.json(data.rows)

  } catch (err) {
    res.status(500).json(err.message)
  }


})

router.put('/orders/:o_id',async(req,res)=>{

  try {

    const u_id_fk = req.user;
    const o_id = req.params
    const is_fufilled = req.body
    const update = pool.query('UPDATE t_orders SET is_fufilled = $1 WHERE o_id = $2 AND u_id_fk = $3',[is_fufilled, o_id, u_id_fk])
    res.json(`orders was updated!`);
    

  } catch (err) {
    res.status(500).json(err.message)
  }


})

module.exports = router;
