

var mongoose = require('mongoose'),
audit = mongoose.model('audit');

const { ObjectId } = require('mongodb');

exports.create_audit= function(req, res) {
    console.log("workin");
  var new_audit = new audit(req.body);
  new_audit.save(function(err, audit) {
    if (err)
      res.send(err);
    res.json(audit);
  });
};


exports.getAll_audit= function(req, res) {
    
    audit.find({},function(err, audit) {
        var count = audit.length;
        if (err)
            res.send(err);
        res.json(audit);
    });
};

exports.getOne_audit= function(req, res) {
    
    audit.findOne({_id: req.params.postId},function(err, audit) {
        if (err)
            res.send(err);
        res.json(audit);
    });
};



exports.getByUser_audit= function(req, res) {
    audit.aggregate([  
          
            {$lookup: {
              localField: "user_id",
              from: "users",
              foreignField: "_id",
              as: "userdetail"
            }
            },
            {$match:{ "userdetail._id": ObjectId(req.params.userId) }}
        ], function (err, audit) {
         if (err){
              res.send(err);
            }else{
              res.json(audit);
            }            
        });
        
    };

    exports.update_audit_level= function(req, res) {
        console.log("update")
        level = req.body.level;
        audit.updateOne({_id: req.params.postId},{ level:level},function(err, audit) {
            if (err)
                res.send(err);
            res.json(audit);
        });
    };

    exports.update_audit_title= function(req, res) {
        console.log("update")
        title = req.body.title;
        audit.updateOne({_id: req.params.postId},{ title: title},function(err, audit) {
            if (err)
                res.send(err);
            res.json(audit);
        });
    };

    exports.delete_audit= function(req, res) {
        audit.deleteOne({_id: req.params.postId},function(err, audit) {
            if (err)
            res.send(err);
            res.json("audit successfuly deleted");
        });
    };
    

 
exports.getOne_audit= function(req, res) {
    
    audit.findOne({_id: req.params.postId},function(err, audit) {
        if (err)
            res.send(err);
        res.json(audit);
    });
};

exports.update_audit= function(req, res) {
    console.log("update")
    comment = req.body.comment;
    pass = req.body.pass;
    requ_id = req.body.requ_id;
    audit.updateOne({_id: req.params.postId},{ comment: comment, pass: pass, requ_id: requ_id},function(err, audit) {
        if (err)
            res.send(err);
        res.json(audit);
    });
};
    
requRes = mongoose.model('requRes');
exports.delete_audit_reqres= function(req, res) {
    audit.deleteOne({_id: req.params.postId},function(err, audit) {
        if (err)
            res.send(err);
        else{
                requRes.deleteMany({audit_id: req.params.postId},function(err, requRes) {
                    if (err)
                        res.send(err);
                    else{
                        res.send("ooooo");
                    }    
                });
            
            
        }    
    });
};
