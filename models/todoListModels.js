var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-type-url');

var requFamilySchema = new Schema({
    family: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('requFamily', requFamilySchema);


var adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin', adminSchema);


var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);

const requSchema = new Schema({
    family_id: {
        type: Schema.Types.ObjectId,
        ref: 'requFamily'
    },
    description: {
        type: String,
        required: true
    },
    procedure: [{type: mongoose.SchemaTypes.Url}],
    rank: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum : ['L1','L2','R'],
        default: 'L1',
        required: true
    },
});

module.exports = mongoose.model('requ', requSchema);


const requResSchema = new Schema({
    requ_id: {
        type: Schema.Types.ObjectId,
        ref: 'requ',
        required: true,
    },
    audit_id: {
        type: Schema.Types.ObjectId,
        ref: 'audit',
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    pass: {
        type: Boolean,
        default: null
    }
});

requResSchema.index({ audit_id: 1, requ_id: 1 }, { unique: true });

module.exports = mongoose.model('requRes', requResSchema);

const screenshotSchema = new Schema({
    requRes_id: {
        type: Schema.Types.ObjectId,
        ref: 'requRes'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    screenshot: {type: String}
});

module.exports = mongoose.model('screenshot', screenshotSchema);

const auditSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    level: {
        type: String,
        enum : ['L1','L1+R','L2','L2+R'],
        default: 'L1+R',
        required: true
    },
})

module.exports = mongoose.model('audit', auditSchema);
