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

    //auth
    app.route('/signup').put(userController.signup);
    app.route('/login').post(userController.login);
    app.route('/login_admin').post(userController.login_admin);
    app.route('/update_password').put(userController.update_password);
    app.route('/list_all_users').get(userController.list_all_users);
    app.route('/delete_user/:postId').delete(userController.delete_user);

    //requ family
    app.route('/addRequFamily').post(requFamilyController.create_requFamily);
    app.route('/deleteRequFamily/:postId').delete(requFamilyController.delete_requFamily);
    app.route('/getRequFamily/')
        .get(requFamilyController.getAll_requFamily);
    app.route('/getRequFamily/:postId')
        .get(requFamilyController.getOne_requFamily);
    app.route('/updateRequFamily/:postId')
        .put(requFamilyController.update_requFamily);

    
    //requ
    app.route('/addRequ').post(requController.create_requ);
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
    app.route('/updateRequ/:postId')
        .put(requController.update_requ);


    //requ result
    app.route('/requRes')
        .post(requResController.create_requRes)
        .get(requResController.getAll_requRes);
    app.route('/requRes/:postId')  
        .get(requResController.getOne_requRes);
    app.route('/deleterequRes/:postId')  
        .delete(requResController.delete_requRes);
    app.route('/updaterequRes/:postId')  
        .put(requResController.update_requRes);
    app.route('/requResAudit/:postId')  
        .get(requResController.getByAudit_requRes);


    //screenshot
    app.route('/screenshot')
        .post(screenshotController.createScreenshot)
        .get(screenshotController.getAllScreenshot);
    app.route('/screenshot/:postId')
        .get(screenshotController.getScreenshot);
    app.route('/screenshotByRequRes/:postId')
        .get(screenshotController.getScreenshotByRequRes);
    app.route('/screenshotUpdate/:postId') 
        .put(screenshotController.updateScreenshot);
    app.route('/screenshotDelete/:postId') 
        .delete(screenshotController.deleteScreenshot);

    //audit
    app.route('/audit')
        .post(auditController.create_audit)
        .get(auditController.getAll_audit);
    app.route('/audit/:postId') 
        .get(auditController.getOne_audit);   
    app.route('/userAudits/:userId') 
        .get(auditController.getByUser_audit);   
    app.route('/updateAudit/:postId') 
        .put(auditController.update_audit);  
    app.route('/deleteAudit/:postId') 
        .delete(auditController.delete_audit);  

}

