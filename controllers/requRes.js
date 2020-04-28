

var mongoose = require('mongoose'),
requRes = mongoose.model('requRes');

const { ObjectId } = require('mongodb');

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
    

exports.getByAudit_requRes= function(req, res) {
    requRes.aggregate([  

      {
        $lookup:{
          localField: "requ_id",
          from: "requs",
          foreignField: "_id",
          as: "requdetail"
        }
      },
      {$match:{ "audit_id": ObjectId(req.params.postId )}},

      {
        "$sort": {
          "requdetail.rank": 1
        }
      },   
      {
        $lookup:{
          localField: "requdetail.family_id",
          from: "requfamilies",
          foreignField: "_id",
          as: "requFamilydetail"
        }
      },
      {
          $group: {
              _id: {
                  family_id: { $arrayElemAt: [ '$requFamilydetail._id', 0 ] },
                  family_name: { $arrayElemAt: [ '$requFamilydetail.family', 0 ] },
                  family_rank: { $arrayElemAt: [ '$requFamilydetail.rank', 0 ] },
                  family_description: { $arrayElemAt: [ '$requFamilydetail.description', 0 ] },
                
              },
              requ: { 
                  $push: { 
                      requRes_id: "$_id",
                      requ_id:  { $arrayElemAt: [ '$requdetail._id', 0 ] },
                      level: { $arrayElemAt: [ "$requdetail.level", 0 ] }, 
                      requ_rank: { $arrayElemAt: [ "$requdetail.rank", 0 ] }, 
                      requ_desctiption: { $arrayElemAt: [ "$requdetail.description", 0 ] }, 
                      requ_procedure: { $arrayElemAt: [ "$requdetail.procedure",  0 ] },
                      requ_pass: "$pass",
                    } 
                },
                pass: {
                    "$sum": {
                      "$cond": [{ "$eq": [ "$pass", true ]}, 1, 0]
                    }
                },
                fail: {
                    "$sum": {
                      "$cond": [{ "$eq": [ "$pass", false ]}, 1, 0]
                    }
                },
                "pass+fail": {
                                    "$sum": {
                                        $add: [
                                            {
                                                "$sum": {
                                                    "$cond": [{ "$eq": [ "$pass", false ]}, 1, 0]
                                                }
                                            },
                                            {
                                                "$sum": {
                                                    "$cond": [{ "$eq": [ "$pass", true ]}, 1, 0]
                                                }
                                            }
                                        ]
                                    }

                } ,
                
                

          }
      },
      {
        $project:{
            pass: 1,
            fail: 1,
            requ: 1,
            "pass+fail": 1,
                "percentage": {
                    "$cond": [
                        { "$eq": [ "$pass", 0 ] },
                        0,
                        { "$divide": [ "$pass", "$pass+fail" ] }
                    ]
                }
            }


        
      },

  ]
    , function (err, requRes) {
     if (err){
          res.send(err);
        }else{
          res.json(requRes);
        }            
    });
    
  };