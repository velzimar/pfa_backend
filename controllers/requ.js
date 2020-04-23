

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
    var new_requ = new requ({
        family_id: f,
        description: d,  
        procedure: proc,
        rank: r
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
    requ.updateOne({_id: req.params.postId},{description: d, family: f,procedure: proc, rank: r},function(err, requ) {
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