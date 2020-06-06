

var mongoose = require('mongoose'),
audit = mongoose.model('audit');
const level = require('../models/level');

const { ObjectId } = require('mongodb');

exports.create_audit= async function(req, res) {
    console.log("workin");
    const level0 = await level.findOne({name: req.body.level});
    if (level0){
        level0.y=level0.y+1;
        const re= await level0.save();
    } else {
        const level1 =new level({
            name: req.body.level,
            y:1
        })
        const resultat=await level1.save();
    }
  var new_audit = new audit(req.body);
  new_audit.save(function(err, audit) {
    if (err)
      res.send(err);
    res.json(audit);
  });
};
exports.get_levels= function(req, res) {
    level.find({},function(err, rep) {
        var count = rep.length;
        if (err)
            res.send(err);
        res.json(rep);
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

    exports.getByUserClient_audit= function(req, res) {
        audit.aggregate([  
              
                {
                    $lookup: {
                        localField: "user_id",
                        from: "users",
                        foreignField: "_id",
                        as: "userdetail"
                    }   
                },
                {
                    $match:{ 
                        $and: [ 
                            { "Client_Name": /*ObjectId(*/req.query.clientName },  
                            { "userdetail._id": ObjectId(req.query.userId) }]
                        },
                }
            ], function (err, audit) {
             if (err){
                  res.send(err);
                }else{
                  res.json(audit);
                }            
            });
            
        };    
    

        exports.getByUserLevel_audit= function(req, res) {
            console.log(req.query.level);
            audit.aggregate([  
                  
                    {
                        $lookup: {
                            localField: "user_id",
                            from: "users",
                            foreignField: "_id",
                            as: "userdetail"
                        }   
                    },
                    {
                        $match:{ 
                            $and: [ 
                                { "level": /*ObjectId(*/req.query.level },  
                                { "userdetail._id": ObjectId(req.query.userId) }]
                            },
                    }
                ], function (err, audit) {
                 if (err){
                      res.send(err);
                    }else{
                      res.json(audit);
                    }            
                });
                
            };    
 
exports.getOne_audit= function(req, res) {
    
    audit.findOne({_id: req.params.postId},function(err, audit) {
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
                        res.send("all audit results are deleted");
                    }    
                });
            
            
        }    
    });
};

exports.delete_audit= async function(req, res) {
    audit.findOne({_id: req.params.postId}, async function(err, audit) {
        const level0 = await level.findOne({name: audit.level});
        console.log(level0);
        if (level0){
            level0.y=level0.y-1;
            const re= await level0.save();
        }
    });
    const level0 = await level.findOne({name: req.level});
    console.log(level0);
    if (level0){
        level0.y=level0.y-1;
        const re= await level0.save();
    }
    audit.deleteOne({_id: req.params.postId},function(err, audit) {
        if (err)
        res.send(err);
        res.json("audit successfuly deleted");
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


exports.update_audit_any= function(req, res) {
    audit.updateOne({_id: req.params.postId}, req.body, { runValidators: true }, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.status(200).send(req.body);
});
};

