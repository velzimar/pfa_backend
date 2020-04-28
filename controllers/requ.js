

var mongoose = require('mongoose'),
requ = mongoose.model('requ');
const { ObjectId } = require('mongodb');

const myURL = "https://github.com/OWASP/owasp-mstg/blob/1.1.3/Document/";

exports.create_requ= function(req, res) {
    console.log("workin");
    //console.log(myURL);
    //console.log(req.body.procedure);
    var array  = []
    req.body.procedure.forEach(element => { 
        array.push(element=myURL+element);
      }); 
    var proc = array;
    console.log(proc);
    var d = req.body.description;
    var r = req.body.rank;
    var f = req.body.family_id;
    var level = req.body.level;
    var new_requ = new requ({
        family_id: f,
        description: d,  
        procedure: proc,
        rank: r,
        level: level
    });
  new_requ.save(function(err, requ) {
    if (err)
      res.send(err);
    res.json(requ);
  });
};


exports.delete_requ= function(req, res) {
    requ.deleteOne({_id: req.params.postId},function(err, requ) {
        if (err)
        res.send(err);
        res.json("requ successfuly deleted");
    });
};

exports.getOne_requ= function(req, res) {
    requ.aggregate([  
      
        {$lookup: {
          localField: "family_id",
          from: "requfamilies",
          foreignField: "_id",
          as: "requFamilydetail"
        }},
        {$match:{_id:ObjectId(req.params.postId) }}
    ], function (err, requ) {
     if (err){
          res.send(err);
        }else{
          res.json(requ);
        }            
    });
    
};

exports.getAll_requ = function(req, res) {
    requ.aggregate([  
        {$lookup: {
          localField: "family_id",
          from: "requfamilies",
          foreignField: "_id",
          as: "requFamilydetail"
        }}
    ], function (err, requ) {
     if (err){
          res.send(err);
        }else{
          res.json(requ);
        }            
    });
};

exports.update_requ= function(req, res) {
    console.log("workin");
    //console.log(myURL);
    //console.log(req.body.procedure);
    var array  = []
    req.body.procedure.forEach(element => { 
        array.push(element=myURL+element);
      }); 
    var proc = array;
    console.log(proc);
    var d = req.body.description;
    var r = req.body.rank;
    var f = req.body.family_id;
    var level = req.body.level;
    requ.updateOne({_id: req.params.postId},{description: d, family: f,procedure: proc, rank: r, level: level},function(err, requ) {
        if (err)
            res.send(err);
        res.json(requ);
    });
};
    
exports.getByFamily_requ= function(req, res) {
    requ.aggregate([  
      
        {$lookup: {
          localField: "family_id",
          from: "requfamilies",
          foreignField: "_id",
          as: "requFamilydetail"
        }
        },
        {$match:{ "requFamilydetail.family": req.params.family }}
    ], function (err, requ) {
     if (err){
          res.send(err);
        }else{
          res.json(requ);
        }            
    });
    
};

exports.get_L1= function(req, res) {
  requ.aggregate([  
    {$match:{ "level": "L1" }},
    {
      "$sort": {
        "rank": 1
      }
    },   
    {
      $lookup:{
        localField: "family_id",
        from: "requfamilies",
        foreignField: "_id",
        as: "requFamilydetail"
      }
    },
    {
        $group: {
            _id: {
                family_id: '$family_id',
                family_name: { $arrayElemAt: [ '$requFamilydetail.family', 0 ] },
                family_rank: { $arrayElemAt: [ '$requFamilydetail.rank', 0 ] },
                family_description: { $arrayElemAt: [ '$requFamilydetail.description', 0 ] },
              
            },
            requ: { $push: { requ_id: "$_id", level: "$level", requ_rank: "$rank", requ_desctiption: "$description", requ_procedure: "$procedure" } }
        }
    },
 /*
    {
        $replaceRoot: {
            newRoot: {
                $let: {
                    vars: { obj: [ { k: {"$toString":["$_id" ]}, v: "$obj" } ] },
                    in: { $arrayToObject: "$$obj" }
                }
            }
        }
    }*/
]
  , function (err, requ) {
   if (err){
        res.send(err);
      }else{
        res.json(requ);
      }            
  }).sort({ "_id.family_rank": 1});;
  
};


exports.get_L2= function(req, res) {
  requ.aggregate([  
    {
      "$sort": {
        "rank": 1
      }
    },   
    {
      $lookup:{
        localField: "family_id",
        from: "requfamilies",
        foreignField: "_id",
        as: "requFamilydetail"
      }
    },
    {
        $group: {
            _id: {
                family_id: '$family_id',
                family_name: { $arrayElemAt: [ '$requFamilydetail.family', 0 ] },
                family_rank: { $arrayElemAt: [ '$requFamilydetail.rank', 0 ] },
                family_description: { $arrayElemAt: [ '$requFamilydetail.description', 0 ] },
              
            },
            requ: { $push: { requ_id: "$_id", level: "$level", requ_rank: "$rank", requ_desctiption: "$description", requ_procedure: "$procedure" } }
        }
    },
 /*
    {
        $replaceRoot: {
            newRoot: {
                $let: {
                    vars: { obj: [ { k: {"$toString":["$_id" ]}, v: "$obj" } ] },
                    in: { $arrayToObject: "$$obj" }
                }
            }
        }
    }*/
]
  , function (err, requ) {
   if (err){
        res.send(err);
      }else{
        res.json(requ);
      }            
  }).sort({ "_id.family_rank": 1});;
  
};


exports.get_R= function(req, res) {
  requ.aggregate([  
    {$match:{ "level": "R" }},
    {
      "$sort": {
        "rank": 1
      }
    },   
    {
      $lookup:{
        localField: "family_id",
        from: "requfamilies",
        foreignField: "_id",
        as: "requFamilydetail"
      }
    },
    {
        $group: {
            _id: {
                family_id: '$family_id',
                family_name: { $arrayElemAt: [ '$requFamilydetail.family', 0 ] },
                family_rank: { $arrayElemAt: [ '$requFamilydetail.rank', 0 ] },
                family_description: { $arrayElemAt: [ '$requFamilydetail.description', 0 ] },
              
            },
            requ: { $push: { requ_id: "$_id", level: "$level", requ_rank: "$rank", requ_desctiption: "$description", requ_procedure: "$procedure" } }
        }
    },
 /*
    {
        $replaceRoot: {
            newRoot: {
                $let: {
                    vars: { obj: [ { k: {"$toString":["$_id" ]}, v: "$obj" } ] },
                    in: { $arrayToObject: "$$obj" }
                }
            }
        }
    }*/
]
  , function (err, requ) {
   if (err){
        res.send(err);
      }else{
        res.json(requ);
      }            
  }).sort({ "_id.family_rank": 1});;
  
};