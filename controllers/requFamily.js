

var mongoose = require('mongoose'),
requFamily = mongoose.model('requFamily');


exports.create_requFamily= function(req, res) {
    console.log("workin");
  var new_requFamily = new requFamily(req.body);
  new_requFamily.save(function(err, requFamily) {
    if (err)
      res.send(err);
    res.json(requFamily);
  });
};


exports.delete_requFamily= function(req, res) {
    requFamily.deleteOne({_id: req.params.postId},function(err, requFamily) {
        if (err)
        res.send(err);
        res.json("requFamily successfuly deleted");
    });
};

exports.getAll_requFamily= function(req, res) {
    
    requFamily.find({},function(err, requFamily) {
        var count = requFamily.length;
        if (err)
            res.send(err);
        res.json(requFamily);
    });
};
 
exports.getOne_requFamily= function(req, res) {
    
    requFamily.findOne({_id: req.params.postId},function(err, requFamily) {
        if (err)
            res.send(err);
        res.json(requFamily);
    });
};

exports.update_requFamily_description= function(req, res) {
    console.log("update family description")
    des = req.body.description;
    requFamily.updateOne({_id: req.params.postId},{description: des},function(err, requFamily) {
        if (err)
            res.send(err);
        res.json(requFamily);
    });
};
    
exports.update_requFamily_family= function(req, res) {
    console.log("update family name")
    f = req.body.family;
    requFamily.updateOne({_id: req.params.postId},{family: f},function(err, requFamily) {
        if (err)
            res.send(err);
        res.json(requFamily);
    });
};

exports.update_requFamily_rank= function(req, res) {
    console.log("update family rank")
    r = req.body.rank;
    requFamily.updateOne({_id: req.params.postId},{rank: r},function(err, requFamily) {
        if (err)
            res.send(err);
        res.json(requFamily);
    });
};

