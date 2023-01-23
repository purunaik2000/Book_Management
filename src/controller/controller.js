const jwt=require('jsonwebtoken');
const userModel = require('../model/UserModel')

const loginUser = async function (req, res) {
    let body=req.body;
    let email = req.body.email;
    let password = req.body.password;
    if(Object.keys(body).length===0) return res.status(400).send("please provide email and password")
    if(!email) return res.send("plz provide email")
    if(!password) return res.send("plz provide password")

    let validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    let validatePassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

    if(!validateEmail.test(email)) return res.status(400).send("Invalid email, please provide valid email")

    if(!validatePassword.test(password)) return res.status(400).send("Invalid password, please enter valid password")
  
    let user = await userModel.findOne({ email:email, password:password });
    if (!user)
      return res.status(404).send({status:false,message:"login failed"})

      let token = jwt.sign(
        {
          Id:user._id.toString()
        },
        "Book-management-secure-key",
        {expiresIn:"10m"}
      );
    
      res.setHeader("jwt-key", token);
      res.status(200).send({status:true,message:"Success",data:{token:token,exp:"10m",userId: user._id, iat:Date.now()}});
    };

    module.exports={loginUser}
