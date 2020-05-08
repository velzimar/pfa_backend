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
            .select("title description _id requRes_id audit_id screenshot")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Screenshot: docs.map(doc => {
                        return {
                            title: doc.title,
                            description: doc.description,
                            _id: doc._id,
                            requRes_id: doc.requRes_id,
                            audit_id: doc.audit_id,
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
                screenshot: req.file.path,
                audit_id: req.body.audit_id
            });
            new_Screenshot.save();

            // Display uploaded image for user validation
            res.send(req.file.path);
            console.log(req.file);
        });



    }

    exports.getScreenshot = function (req, res) {
        const id = req.params.postId;
        Screenshot.findById(id)
            .select('title description _id requRes_id audit_id screenshot')
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
            .select("title description _id requRes_id audit_id screenshot")
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
            .select("title description _id requRes_id audit_id screenshot")
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
