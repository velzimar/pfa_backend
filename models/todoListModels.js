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
    }
});

module.exports = mongoose.model('requ', requSchema);
