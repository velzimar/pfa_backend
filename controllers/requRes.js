

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

exports.update_requRes_Comment= function(req, res) {
    console.log("update requres comment")
    comment = req.body.comment;
    requRes.updateOne({_id: req.params.postId},{ comment: comment},function(err, requRes) {
        if (err)
            res.send(err);
        res.json(requRes);
    });
};

exports.update_requRes_Pass= function(req, res) {
  console.log("update requres pass")
  pass = req.body.pass;
  requRes.updateOne({_id: req.params.postId},{ pass: pass},function(err, requRes) {
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
                      requRes_pass: "$pass",
                      requRes_comment: "$comment"
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

                "n/a": {
                  "$sum": {
                    "$cond": [{ "$eq": [ "$pass", null ]}, 1, 0]
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
            "n/a": 1,
            
            //"pass+fail": 1,
            //"percentage":1,
            
            /*"percentage": {
                    "$cond": [
                        { "$eq": [ "$pass", 0 ] },
                        0,
                        { "$divide": [ "$pass", "$pass+fail" ] }
                    ]
            },   */  
            "percentage": { 
              "$concat": [ { "$substr": [ { "$multiply": [
                {
                  "$cond": [
                      { "$eq": [ "$pass", 0 ] },
                      0,
                      { "$divide": [ "$pass", "$pass+fail" ] }
                  ]
          }
                
                , 100 ] }, 0,5 ] }, "", "%" ]
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
    }).sort({ "_id.family_rank": 1});
    
  };

  


exports.getByAudit_Average_requRes= function(req, res) {
  requRes.aggregate([  
    { "$facet": {
      "projection": [
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
                    requRes_pass: "$pass",
                    requRes_comment: "$comment"
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

              "n/a": {
                "$sum": {
                  "$cond": [{ "$eq": [ "$pass", null ]}, 1, 0]
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
          "n/a": 1,
          
          "pass+fail": 1,
          
          "percentage": {
            "$multiply":{
              "$cond": [
                { "$eq": [ "$pass", 0 ] },
                0,
                { "$divide": [ "$pass", "$pass+fail" ] }
              ]
            }
          },

     


          } 
    },

  ],


}},

{ "$project": { 
  "audit_id": ObjectId(req.params.postId ) ,
  "Score": {
    "$multiply":[{"$avg": "$projection.percentage" },5]   
    }
  
}},


]
  , function (err, requRes) {
   if (err){
        res.send(err);
      }else{
        res.json(requRes);
      }            
  });
  
};