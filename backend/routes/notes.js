const express=require("express")
const router=express.Router()

router.get('/',(req,res)=>{
    let obj={
        name:"uday",
        rollno:21,
        notes:"yes"
    }
    res.json(obj)
})
module.exports=router