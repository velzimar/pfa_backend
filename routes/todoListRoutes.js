module.exports = function (app) {
    var cors = require('cors');
    app.use(cors());
    
    //require
    var userController = require('../controllers/auth');
    var requFamilyController = require('../controllers/requFamily');
    var requController = require('../controllers/requ');

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
    app.route('/updateRequ/:postId')
        .put(requController.update_requ);
    

}

