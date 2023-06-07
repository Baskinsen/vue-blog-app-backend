const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
module.exports.index = (req, res) => {
    Users.find().sort({ createdAt: -1 })
        .then((result) =>{
            res.send(result)
            console.log(result)
        })
        .catch((err)=> {
            res.send(err)
            console.log(err)
         })
}
module.exports.signUp = async (req, res) => {
    try{
        let hash =  await bcrypt.hash(req.body.password, 10)
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            email: req.body.email
        }
        const user = new Users(newUser);
        user.save()
            .then((result) => {
                res.send("Account Created");
                console.log(result)
            })
            .catch((err)=> {
                res.send("Failed to create account")
                console.log(err)
            })
    } catch(err) {
        res.send(err)
        console.log(err)
    }
}

module.exports.login = (req, res) => {
 try {
    Users.findOne({email: req.body.email})
        .then(async (result) => {
            if(result) {
                let match = await bcrypt.compare(req.body.password, result.password)
                if(match) {
                    res.send("Login Successful")
                    console.log("Login Successful")
                } else {
                    res.send("Incorrect Password")
                    console.log("Incorrect Password")
                }
            } else {
                res.send("User not found")
                console.log("User not found")
            }
        })
 } 
 catch(err) {
    res.send(err)
    console.log(err)
 }
}

module.exports.deleteUser = (req, res) => {
    const id = req.params.id;
    Users.findByIdAndDelete(id)
      .then((result)=> {
        res.send("User deleted")
        console.log(result)
      })
      .catch((err)=>{
        res.send(err)
        console.log(err)

      })
}

module.exports.updateDetails = (req, res) => {
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.send(result);
            console.log(result)
        })
        .catch(err=> {
            res.send(err)
            console.log(err)
        })
}