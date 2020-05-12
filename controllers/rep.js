
var mongoose = require('mongoose'),
rep = mongoose.model('rep');

const { ObjectId } = require('mongodb');

exports.create_rep= function(req, res) {
    console.log("create rep");
  var new_rep = new rep(req.body);
  new_rep.save(function(err, rep) {
    if (err)
      res.send(err);
    res.json(rep);
  });
};




exports.getAll_rep= function(req, res) {
    
    rep.find({},function(err, rep) {
        var count = rep.length;
        if (err)
            res.send(err);
        res.json(rep);
    });
};

exports.getOne_rep= function(req, res) {
    
    rep.findOne({_id: req.params.postId},function(err, rep) {
        if (err)
            res.send(err);
        res.json(rep);
    });
};



exports.getByAudit_rep= function(req, res) {
    rep.aggregate([  
          
            {$lookup: {
              localField: "audit_id",
              from: "audits",
              foreignField: "_id",
              as: "auditdetail"
            }
            },
            {$match:{ "audit_id": ObjectId(req.params.postId) }}
        ], function (err, rep) {
         if (err){
              res.send(err);
            }else{
              res.json(rep);
            }            
        });
        
    };

    
    

 
exports.getOne_rep= function(req, res) {
    
    rep.findOne({_id: req.params.postId},function(err, rep) {
        if (err)
            res.send(err);
        res.json(rep);
    });
};
    
requRes = mongoose.model('requRes');

exports.delete_by_audit= function(req, res) {
    
                rep.deleteMany({audit_id: req.params.postId},function(err, rep) {
                    if (err)
                        res.send(err);
                    else{
                        res.send("all rep with audit_id: "+req.params.postId+ " are deleted");
                    }    
                });
           
};

exports.delete_rep= function(req, res) {
    rep.deleteOne({_id: req.params.postId},function(err, rep) {
        if (err)
        res.send(err);
        res.json("rep successfuly deleted");
    });
};



exports.update_rep_any= function(req, res) {
    rep.updateOne({_id: req.params.postId}, req.body, { runValidators: true }, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.status(200).send(req.body);
});
};

