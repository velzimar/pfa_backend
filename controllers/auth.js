const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
 Admin = mongoose.model('admin');
 User = mongoose.model('user');

exports.signup = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user1 = await User.findOne({ email: email });
        if (user1) {
            const error = new Error('user allready exists.');
            error.statusCode = 401;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
        });
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'somesupersecretsecret'
        );

            res.status(200).json({token: token, userId: loadedUser._id.toString()});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.update_password = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const new_password = req.body.new_password;

    const hashedPw = await bcrypt.hash(new_password, 12);
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('Wrong email!');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        await User.findOneAndUpdate({email: email}, {password: hashedPw}, {new: true,useFindAndModify: false});
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'somesupersecretsecret'
        );

            res.status(200).json({token: token, userId: loadedUser._id.toString()});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login_admin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await Admin.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'somesupersecretsecret'
        );

        res.status(200).json({token: token, userId: loadedUser._id.toString()});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.list_all_users = function(req, res) {
    console.log('List users');
    User.find({__v :0}, function(err, User) {
      if (err)
        res.send(err);
      res.json(User);
    });
  };

exports.delete_user = function(req, res) {
    User.remove({
      _id: req.params.postId
    }, function(err, User) {
      if (err)
        res.send(err);
      res.json({ message: 'User deleted' });
    });
  };  