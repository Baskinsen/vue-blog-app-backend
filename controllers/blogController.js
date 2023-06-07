const Blogs = require('../models/blogsModel');

module.exports.index = (req, res) => {
    Blogs.find().sort({ createdAt: -1 })
        .then((result) => {
           console.log(result)
           res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports.create = (req, res) => {
    console.log(req.body)
    const blog = new Blogs(req.body);
    blog.save()
        .then((result) => {
            res.send(result);
            console.log(result)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
}

module.exports.delete_Blog = (req, res) => { 
    const id = req.params.id;
    Blogs.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        });
 }

module.exports.update = (req, res) => {
    const id = req.params.id;
    Blogs.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.send(result);
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })
}