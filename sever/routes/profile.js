const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization')


router.get('/name',authorization,async (req,res)=>{


    try {
        
        const currentUser = await pool.query("SELECT u_name FROM t_user WHERE u_id = $1",[req.user])
        res.json(currentUser.rows[0])


    } catch (err) {
        res.status(500).json(err.message)
    }

})

router.get('/type',authorization,async (req,res)=>{


    try {


        // const currentUser = await pool.query("SELECT u_type FROM t_user WHERE u_id = $1",[req.user])
        // res.json(currentUser.rows[0])
        res.json(req.type)


    } catch (err) {
        res.status(500).json(err.message)
    }

})



module.exports = router