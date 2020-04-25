

var mongoose = require('mongoose'),
requRes = mongoose.model('requRes');


exports.create_requRes= function(req, res) {
    console.log("workin");
  var new_requRes = new requRes(req.body);
  new_requRes.save(function(err, requRes) {
    if (err)
      res.send(err);
    res.json(requRes);
  });
};


exports.delete_requRes= function(req, res) {
    requRes.deleteOne({_id: req.params.postId},function(err, requRes) {
        if (err)
        res.send(err);
        res.json("requRes successfuly deleted");
    });
};

exports.getAll_requRes= function(req, res) {
    
    requRes.find({},function(err, requRes) {
        var count = requRes.length;
        if (err)
            res.send(err);
        res.json(requRes);
    });
};
 
exports.getOne_requRes= function(req, res) {
    
    requRes.findOne({_id: req.params.postId},function(err, requRes) {
        if (err)
            res.send(err);
        res.json(requRes);
    });
};

exports.update_requRes= function(req, res) {
    console.log("update")
    comment = req.body.comment;
    pass = req.body.pass;
    requ_id = req.body.requ_id;
    requRes.updateOne({_id: req.params.postId},{ comment: comment, pass: pass, requ_id: requ_id},function(err, requRes) {
        if (err)
            res.send(err);
        res.json(requRes);
    });
};
    

