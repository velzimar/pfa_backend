    //requ screenshot
    var mongoose = require('mongoose');
    const multer = require('multer');

    Screenshot = mongoose.model('screenshot');

    const {
        ObjectId
    } = require('mongodb');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };


    exports.getAllScreenshot = function (req, res) {
        Screenshot.find()
            .select("title description risk remedation systems tools cvss references _id requRes_id audit_id screenshot")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Screenshot: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.description,
                            remedation: doc.remedation,
                            risk: doc.risk,
                            tools: doc.tools,
                            references: doc.references,
                            systems: doc.systems,
                            _id: doc._id,
                            requRes_id: doc.requRes_id,
                            audit_id: doc.audit_id,
                            cvss: doc.cvss,
                            request: {
                                type: "GET",
                                url: "http://localhost:8050/screenshot/" + doc._id
                            }
                        };
                    })
                };
                //   if (docs.length >= 0) {
                res.status(200).json(response);
                //   } else {
                //       res.status(404).json({
                //           message: 'No entries found'
                //       });
                //   }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }


    exports.createScreenshot = async function (req, res) {
        // Display uploaded image for user validation
        //res.send(req.file.path);

        let upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('screenshot');
        upload(req, res, function (err) {

            var array1 = []
            req.body.tools.forEach(element => {
                array1.push(element);
            });
            var array2 = []
            req.body.references.forEach(element => {
                array2.push(element);
            });
            var array3 = []
            req.body.systems.forEach(element => {
                array3.push(element);
            });
            console.log(array1);
            console.log(array2);
            console.log(array3);
            var tools = array1;
            var references = array2;
            var systems = array3;
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            const new_Screenshot = new Screenshot({
                _id: new mongoose.Types.ObjectId(),
                requRes_id: req.body.requRes_id,
                title: req.body.title,
                description: req.body.description,
                remedation: req.body.remedation,
                risk: req.body.risk,
                screenshot: req.file.path,
                audit_id: req.body.audit_id,
                tools: tools,
                references: references,
                systems: systems,
                cvss: req.body.cvss
            });
            new_Screenshot.save();

            // Display uploaded image for user validation
            res.send(req.file.path);
            console.log(req.file);
        });



    }

    exports.createWithoutScreenshot = function(req, res) {


            var array1 = []
            req.body.tools.forEach(element => {
                array1.push(element);
            });
            var array2 = []
            req.body.references.forEach(element => {
                array2.push(element);
            });
            var array3 = []
            req.body.systems.forEach(element => {
                array3.push(element);
            });
            console.log(array1);
            console.log(array2);
            console.log(array3);
            var tools = array1;
            var references = array2;
            var systems = array3;
            
            const new_Screenshot = new Screenshot({
                _id: new mongoose.Types.ObjectId(),
                requRes_id: req.body.requRes_id,
                title: req.body.title,
                description: req.body.description,
                remedation: req.body.remedation,
                risk: req.body.risk,
                audit_id: req.body.audit_id,
                tools: tools,
                references: references,
                systems: systems,
                cvss: req.body.cvss
            });
            new_Screenshot.save(function(err, Screenshot) {
                if (err)
                  res.send(err);
                res.json(Screenshot);
              });

    }
    exports.getScreenshot = function (req, res) {
        const id = req.params.postId;
        Screenshot.findById(id)
            .select('title description risk remedation systems tools cvss references _id requRes_id audit_id screenshot')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        Screenshot: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8050/screenshot/' + doc._id
                        }
                    });
                } else {
                    res
                        .status(404)
                        .json({
                            message: "No valid entry found for provided ID"
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
    exports.getScreenshotByRequRes = function (req, res) {
        const id = req.params.postId;
        Screenshot.find({
                requRes_id: id
            })
            .select("title description risk remedation systems tools cvss references _id requRes_id audit_id screenshot")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Screenshot: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.description,
                            productImage: doc.productImage,
                            _id: doc._id,
                            requRes_id: doc.requRes_id,
                            audit_id: doc.audit_id,
                            path: doc.screenshot,
                            remedation: doc.remedation,
                            risk: doc.risk,
                            tools: doc.tools,
                            references: doc.references,
                            systems: doc.systems,
                            cvss: doc.cvss,
                            request: {
                                type: "GET",
                                url: "http://localhost:8050/screenshot/" + doc._id
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }


    exports.getScreenshotByAudit = function (req, res) {
        const fs = require('fs');
        // const path = require('path');
        const id = req.params.postId;
        Screenshot.find({
                audit_id: id
            })
            .select("title description risk remedation systems cvss tools references _id requRes_id audit_id screenshot")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Screenshot: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.description,
                            productImage: doc.productImage,
                            _id: doc._id,
                            requRes_id: doc.requRes_id,
                            audit_id: doc.audit_id,
                            path: doc.screenshot,
                            remedation: doc.remedation,
                            risk: doc.risk,
                            tools: doc.tools,
                            references: doc.references,
                            systems: doc.systems,
                            cvss: doc.cvss,
                            request: {
                                type: "GET",
                                url: "http://localhost:8050/screenshot/" + doc._id
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })


            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }

    /*
    exports.deleteScreenshot = function destroy(req, res) {
        const {
            id
        } = req.params;
        var fs = require('fs');
        Screenshot.findOneAndRemove({
                id
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                res.json(screenshot);
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }*/

    exports.deleteScreenshotImage = function (req, res) {
        
        var fs = require('fs');
        Screenshot.findById({
                _id: req.params.postId
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            })
            .catch(err => {
                console.log('File delete problem!');
            });

/*

        let upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('screenshot');
        upload(req, res, function (err) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }*/
            Screenshot.findOneAndUpdate({
                _id: req.params.postId
            }, {
                screenshot: null,
               

            }, {
                useFindAndModify: false
            }, function (err, Screenshot) {
                if (err)
                    res.send(err);
                res.json("file updated");
            });
        //});
    };/*
    exports.deleteScreenshotImage = function destroy(req, res) {
        var fs = require('fs');
        Screenshot.findById({
                _id: req.params.postId
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                    res.json("Screenshot Image successfuly deleted");
                    screenshot.screenshot=null;
                });
            })
            .catch(err => {
                console.log('File delete problem!');
            });

    }*/
    exports.deleteScreenshot = function destroy(req, res) {
        var fs = require('fs');
        Screenshot.findById({
                _id: req.params.postId
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            })
            .catch(err => {
                console.log('File delete problem!');
            });
        Screenshot.deleteOne({
            _id: req.params.postId
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json("Screenshot successfuly deleted");
        });

    }
    exports.deleteWithoutScreenshot = function destroy(req, res) {
        
        Screenshot.deleteOne({
            _id: req.params.postId
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json("Screenshot successfuly deleted");
        });

    }
    exports.updateScreenshotTitle = function (req, res) {
        console.log("update screenshot title");
        title = req.body.title;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            title: title
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };


    exports.updateScreenshotDescription = function (req, res) {
        console.log("update screenshot description");
        description = req.body.description;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            description: description
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };
    exports.updateScreenshotCvss = function (req, res) {
        console.log("update screenshot cvss");
        cvss = req.body.cvss;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            cvss: cvss
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };
    exports.updateScreenshotRemedation = function (req, res) {
        console.log("update screenshot remedation");
        remedation = req.body.remedation;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            remedation: remedation
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };

    exports.updateScreenshotRisk = function (req, res) {
        console.log("update screenshot risk");
        risk = req.body.risk;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            risk: risk
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };

    exports.updateScreenshotTools = function (req, res) {
        console.log("UPDATE tools");
        console.log(tools);
        var array1 = []
        req.body.tools.forEach(element => {
            array1.push(element);
        });
        var tools = array1;
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            tools: tools
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };

    exports.updateScreenshotSystems = function (req, res) {
        console.log("UPDATE systems");
        var array = []
        req.body.systems.forEach(element => {
            array.push(element);
        });
        var proc = array;
        console.log(proc);
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            systems: proc
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };

    exports.updateScreenshotReferences = function (req, res) {
        console.log("UPDATE references");
        var array = []
        req.body.references.forEach(element => {
            array.push(element);
        });
        var proc = array;
        console.log(proc);
        Screenshot.updateOne({
            _id: req.params.postId
        }, {
            references: proc
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json(Screenshot);
        });
    };



    exports.updateScreenshotImageOnly = function (req, res) {
        console.log("aaa");
        console.log(req.body);
        var fs = require('fs');
        Screenshot.findById({
                _id: req.params.postId
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            })
            .catch(err => {
                console.log('File delete problem!');
            });



        let upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('screenshot');
        upload(req, res, function (err) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            Screenshot.findOneAndUpdate({
                _id: req.params.postId
            }, {
                screenshot: req.file.path,

            }, {
                useFindAndModify: false
            }, function (err, Screenshot) {
                if (err)
                    res.send(err);
                res.json("file updated");
            });
        });
    };
    exports.updateScreenshot = function (req, res) {
        console.log("aaa");
        console.log(req.body);
        var fs = require('fs');
        Screenshot.findById({
                _id: req.params.postId
            }, {
                useFindAndModify: false
            })
            .then(screenshot => {
                console.log(screenshot.screenshot);
                fs.unlink(screenshot.screenshot, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            })
            .catch(err => {
                console.log('File delete problem!');
            });



        let upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('screenshot');
        upload(req, res, function (err) {

            var array1 = []
            req.body.tools.forEach(element => {
                array1.push(element);
            });
            var array2 = []
            req.body.references.forEach(element => {
                array2.push(element);
            });
            var array3 = []
            req.body.systems.forEach(element => {
                array3.push(element);
            });
            console.log(array1);
            console.log(array2);
            console.log(array3);
            var tools = array1;
            var references = array2;
            var systems = array3;
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            Screenshot.findOneAndUpdate({
                _id: req.params.postId
            }, {
                screenshot: req.file.path,
                requRes_id: req.body.requRes_id,
                title: req.body.title,
                description: req.body.description,
                remedation: req.body.remedation,
                risk: req.body.risk,
                tools: tools,
                references: references,
                systems: systems,
                cvss: req.body.cvss

            }, {
                useFindAndModify: false
            }, function (err, Screenshot) {
                if (err)
                    res.send(err);
                res.json("file updated");
            });
        });
    };
    exports.updateNoScreenshot = function (req, res) {
        console.log("aaa");
        console.log(req.body);
       


        let upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('screenshot');
        upload(req, res, function (err) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            Screenshot.findOneAndUpdate({
                _id: req.params.postId
            }, {
                screenshot: req.file.path,

            }, {
                useFindAndModify: false
            }, function (err, Screenshot) {
                if (err)
                    res.send(err);
                res.json("file updated");
            });
        });
    };
    exports.updateScreenshot2 = function (req, res) {

        var array1 = []
        req.body.tools.forEach(element => {
            array1.push(element);
        });
        var array2 = []
        req.body.references.forEach(element => {
            array2.push(element);
        });
        var array3 = []
        req.body.systems.forEach(element => {
            array3.push(element);
        });
        console.log(array1);
        console.log(array2);
        console.log(array3);
        var tools = array1;
        var references = array2;
        var systems = array3;
        Screenshot.findOneAndUpdate({
            _id: req.params.postId
        }, {
            requRes_id: req.body.requRes_id,
            title: req.body.title,
            description: req.body.description,
            remedation: req.body.remedation,
            risk: req.body.risk,
            tools: tools,
            references: references,
            systems: systems,
            cvss: req.body.cvss

        }, {
            useFindAndModify: false
        }, function (err, Screenshot) {
            if (err)
                res.send(err);
            res.json("file updated");
        });
    };


    exports.getScreenshotGroupedByFamiliesAndRequAndRequRes = function (req, res) {
        Screenshot.aggregate([{
                $match: {
                    "audit_id": ObjectId(req.params.postId)
                }
            },

            {
                $lookup: {
                    localField: "requRes_id",
                    from: "requres",
                    foreignField: "_id",
                    as: "requresdetail"
                }
            },
            {
                $lookup: {
                    localField: "requresdetail.requ_id",
                    from: "requs",
                    foreignField: "_id",
                    as: "requsdetail"
                }
            }, {
                $lookup: {
                    localField: "requsdetail.family_id",
                    from: "requfamilies",
                    foreignField: "_id",
                    as: "requfamilydetail"
                }
            },

            {
                $group: {
                    _id: {
                        family_id: {
                            $arrayElemAt: ['$requfamilydetail.family_id', 0]
                        },
                        family_name: {
                            $arrayElemAt: ['$requfamilydetail.family', 0]
                        },
                        family_rank: {
                            $arrayElemAt: ['$requfamilydetail.rank', 0]
                        },
                        family_description: {
                            $arrayElemAt: ['$requfamilydetail.description', 0]
                        },
                        requ_id: {
                            $arrayElemAt: ['$requsdetail._id', 0]
                        },
                        requ_description: {
                            $arrayElemAt: ['$requsdetail.description', 0]
                        },
                        requ_rank: {
                            $arrayElemAt: ['$requsdetail.rank', 0]
                        },
                        requ_procedure: '$requsdetail.procedure',
                        requRes_id: {
                            $arrayElemAt: ['$requresdetail._id', 0]
                        },
                        requRes_comment: {
                            $arrayElemAt: ['$requresdetail.comment', 0]
                        },
                        requRes_pass: {
                            $arrayElemAt: ['$requresdetail.pass', 0]
                        },

                    },
                    ScreenshotsOfOneRequRes: {
                        $push: {
                            screenshot_id: "$_id",
                            title: "$title",
                            description: "$description",
                            risk: "$risk",
                            remedation: "$remedation",
                            tools: "$tools",
                            systems: "$systems",
                            references: "$references",
                            screenshot: "$screenshot",
                            cvss: "$cvss"
                        }
                    }
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
        ], function (err, Screenshot) {
            if (err) {
                res.send(err);
            } else {
                res.json(Screenshot);
            }
        }).sort({
            "_id.family_rank": 1,
            "_id.requ_rank": 1
        });

    };
    exports.getScreenshotByAudit = function (req, res) {
        const fs = require('fs');
        // const path = require('path');
        const id = req.params.postId;
        Screenshot.find({
                audit_id: id
            })
            .select("title description risk remedation systems cvss tools references _id requRes_id audit_id screenshot")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Screenshot: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.description,
                            productImage: doc.productImage,
                            _id: doc._id,
                            requRes_id: doc.requRes_id,
                            audit_id: doc.audit_id,
                            path: doc.screenshot,
                            remedation: doc.remedation,
                            risk: doc.risk,
                            tools: doc.tools,
                            references: doc.references,
                            systems: doc.systems,
                            cvss: doc.cvss,
                            request: {
                                type: "GET",
                                url: "http://localhost:8050/screenshot/" + doc._id
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })


            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
    exports.getScreenshotByAuditGroupByCvss = function (req, res) {
            Screenshot.aggregate([{
                            $match: {
                                "audit_id": ObjectId(req.params.postId)
                            }
                        },

                        {
                            $group: {
                                _id: {
                                    _id: "$audit_id",

                                },
                                requ: {
                                    $push: {
                                        screenshot_id: "$_id",
                                        cvss: "$cvss",
                                    }
                                },
                                High: {
                                    "$sum": {
                                        "$cond": [{
                                            "$eq": ["$cvss", "High"]
                                        }, 1, 0]
                                    }
                                },
                                Medium: {
                                    "$sum": {
                                        "$cond": [{
                                            "$eq": ["$cvss", "Medium"]
                                        }, 1, 0]
                                    }
                                },
                                Information: {
                                    "$sum": {
                                        "$cond": [{
                                            "$eq": ["$cvss", "Information"]
                                        }, 1, 0]
                                    }
                                },
                                Low: {
                                    "$sum": {
                                        "$cond": [{
                                            "$eq": ["$cvss", "Low"]
                                        }, 1, 0]
                                    }
                                },
                                Total: { $sum: 1 },
                                
                            }
                        },
                        {
                            $project:{
                                High: 1,
                                Low: 1,
                                Information: 1,
                                Medium: 1,
                                Total: 1
                            }
                        }
                            ],
                            function (err, Screenshot) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(Screenshot);
                                }
                            });
                    };