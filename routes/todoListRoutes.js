module.exports = function (app) {
    var cors = require('cors');
    app.use(cors());
    
    //require
    var userController = require('../controllers/auth');
    var requFamilyController = require('../controllers/requFamily');
    var requController = require('../controllers/requ');
    var requResController = require('../controllers/requRes');
    var screenshotController = require('../controllers/screenshot');
    var auditController = require('../controllers/audit');
    var repController = require('../controllers/rep');

    //auth
    app.route('/signup').put(userController.signup);
    app.route('/login').post(userController.login);
    app.route('/login_admin').post(userController.login_admin);
    app.route('/update_password').put(userController.update_password);
    app.route('/list_all_users').get(userController.list_all_users);
    app.route('/delete_user/:postId').delete(userController.delete_user);

    //requ family
    app.route('/addRequFamily').post(requFamilyController.create_requFamily);
    app.route('/addRequFamilies').post(requFamilyController.create_requFamilies);
    app.route('/deleteRequFamily/:postId').delete(requFamilyController.delete_requFamily);
    app.route('/getRequFamily/')
        .get(requFamilyController.getAll_requFamily);
    app.route('/getRequFamily/:postId')
        .get(requFamilyController.getOne_requFamily);
    app.route('/updateRequFamilyDescription/:postId')
        .put(requFamilyController.update_requFamily_description);
    app.route('/updateRequFamilyFamily/:postId')
        .put(requFamilyController.update_requFamily_family);
    app.route('/updateRequFamilyRank/:postId')
        .put(requFamilyController.update_requFamily_rank);        
    
    //requ
    app.route('/addRequ').post(requController.create_requ);
    app.route('/addRequs').post(requController.create_requs);
    app.route('/deleteRequ/:postId').delete(requController.delete_requ);
    app.route('/getRequ')
        .get(requController.getAll_requ);
    app.route('/getRequ/:postId')
        .get(requController.getOne_requ);
    app.route('/getRequByFamily/:family')   
        .get(requController.getByFamily_requ);
    app.route('/get_L1')   
        .get(requController.get_L1);
    app.route('/get_L2')   
        .get(requController.get_L2);
    app.route('/get_R')   
        .get(requController.get_R);
    app.route('/updateProcedure/:postId')
        .put(requController.update_procedure);
    app.route('/updateDescription/:postId')
        .put(requController.update_description);
    app.route('/updateRank/:postId')
        .put(requController.update_rank);
    app.route('/updateFamily/:postId')
        .put(requController.update_family_id);
    app.route('/updateLevel/:postId')
        .put(requController.update_level);

    //requ result
    app.route('/requRes')
        .post(requResController.create_requRes)
        .get(requResController.getAll_requRes);
    app.route('/requRes/:postId')  
        .get(requResController.getOne_requRes);
    app.route('/deleterequRes/:postId')  
        .delete(requResController.delete_requRes);
    app.route('/updaterequResPass/:postId')  
        .put(requResController.update_requRes_Pass);
    app.route('/updaterequResComment/:postId')  
        .put(requResController.update_requRes_Comment);        
    app.route('/requResAudit/:postId')  
        .get(requResController.getByAudit_requRes);
    app.route('/requResAverageAudit/:postId')  
        .get(requResController.getByAudit_Average_requRes);
    app.route('/requResAuditFail/:postId')  
        .get(requResController.getByAudit_requRes_fail);

    //screenshot
    app.route('/screenshot')
        .post(screenshotController.createScreenshot)
        .get(screenshotController.getAllScreenshot);
        
    app.route('/noscreenshot')
    .post(screenshotController.createWithoutScreenshot)
    app.route('/screenshot/:postId')
        .get(screenshotController.getScreenshot);
    app.route('/screenshotByRequRes/:postId')
        .get(screenshotController.getScreenshotByRequRes);   
    app.route('/screenshotDelete/:postId') 
        .delete(screenshotController.deleteScreenshot);
    app.route('/screenshotDeleteImage/:postId') 
        .delete(screenshotController.deleteScreenshotImage);
    app.route('/deletewithoutscreenshot/:postId') 
        .delete(screenshotController.deleteWithoutScreenshot);
    app.route('/screenshotByAudit/:postId') 
        .get(screenshotController.getScreenshotByAudit);
    app.route('/screenshotGrouped/:postId') 
        .get(screenshotController.getScreenshotGroupedByFamiliesAndRequAndRequRes);
    app.route('/cvss/:postId') 
        .get(screenshotController.getScreenshotByAuditGroupByCvss);

        
        //UPDATING    
        app.route('/screenshotUpdateTitle/:postId') 
            .put(screenshotController.updateScreenshotTitle);
        app.route('/screenshotUpdateDescription/:postId') 
            .put(screenshotController.updateScreenshotDescription);  
        app.route('/screenshotUpdateRemedation/:postId') 
            .put(screenshotController.updateScreenshotRemedation);    
        app.route('/screenshotUpdateRisk/:postId') 
            .put(screenshotController.updateScreenshotRisk); 
        app.route('/screenshotUpdateTools/:postId') 
            .put(screenshotController.updateScreenshotTools);    
        app.route('/screenshotUpdateSystems/:postId') 
            .put(screenshotController.updateScreenshotSystems);  
        app.route('/screenshotUpdateReferences/:postId') 
            .put(screenshotController.updateScreenshotReferences);
        app.route('/screenshotUpdateCvss/:postId') 
            .put(screenshotController.updateScreenshotCvss);
        app.route('/screenshotUpdate/:postId') 
            .put(screenshotController.updateScreenshot);
        app.route('/screenshotUpdate2/:postId')
            .put(screenshotController.updateScreenshot2);
        app.route('/noscreenshotUpdate/:postId')
            .put(screenshotController.updateNoScreenshot);
        app.route('/screenshotOnlyImage/:postId') 
            .put(screenshotController.updateScreenshotImageOnly);
    //audit
    app.route('/levels')
        .get(auditController.get_levels);
    app.route('/audit')
        .post(auditController.create_audit)
        .get(auditController.getAll_audit);
    app.route('/audit/:postId') 
        .get(auditController.getOne_audit);   
    app.route('/userAudits/:userId') 
        .get(auditController.getByUser_audit);  
    app.route('/userAuditsByClient') 
        .get(auditController.getByUserClient_audit);   
    app.route('/userAuditsByLevel') 
        .get(auditController.getByUserLevel_audit);          
    app.route('/updateAudit/:postId') 
        .put(auditController.update_audit_any);          
    app.route('/deleteAudit/:postId') 
        .delete(auditController.delete_audit);  
    app.route('/deleteAuditReqRes/:postId') 
        .delete(auditController.delete_audit_reqres);  

    //rep
    app.route('/rep')
        .post(repController.create_rep)
        .get(repController.getAll_rep);
    app.route('/rep/:postId') 
        .get(repController.getOne_rep);   
    app.route('/auditsReps/:postId') 
        .get(repController.getByAudit_rep);   
    app.route('/updateRep/:postId') 
        .put(repController.update_rep_any);          
    app.route('/deleteRep/:postId') 
        .delete(repController.delete_rep);  
    app.route('/deleteAuditRep/:postId') 
        .delete(repController.delete_by_audit);
    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(200).json({ message: message, data: data });
    })

}

