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

var requSchema = new Schema({
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


const auditSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    //General testing informations
    level: {
        type: String,
        enum : ['L1','L1+R','L2','L2+R'],
        default: 'L1+R',
        required: true
    },
    MASVS_VERSION: {
        type: String,
        default:    "1.2"
    },
    ONLINE_MASVS_VERSION: {
        type: String,
        default:    "https://github.com/OWASP/owasp-masvs/tree/master/Document"
    },
    MSTG_VERSION: {
        type: String,
        default:    "1.1.3"
    },
    ONLINE_MSTG_VERSION: {
        type: String,
        default:    "https://github.com/OWASP/owasp-mstg/tree/1.1.3/Document"
    },
    Client_Name: {
        type: String
    },
    Test_location: {
        type: String
    },
    Start_Date: {
        type: String
    },
    Closing_Date: {
        type: String
    },
    Name_Of_Tester: {
        type: String
    },
    Testing_Scope: {
        type: String
    },
    //TESTING INFORMATION ANDROID
    Application_Name: {
        type: String
    },
    Google_PlayStore_Link: {
        type: String
    },
    Filename: {
        type: String
    },
    Version: {
        type: String
    },
    SHA256_HASH_OF_APK: {
        type: String
        //can be obtained by using shasum, openssl or sha256sum
    }
})

module.exports = mongoose.model('audit', auditSchema);

const screenshotSchema = new Schema({
    audit_id:{
        type: Schema.Types.ObjectId,
        ref: 'audit'
    },
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
    risk: {
        type: String
    },
    remedation: {
        type: String
    },
    screenshot: {type: String},
    tools: [{type: String}],
    systems: [{type: String}],
    references: [{type: String}],
    cvss: {
        type: String,
        enum : ['High','Medium','Low','Information'],
        required: true
    },
});

module.exports = mongoose.model('screenshot', screenshotSchema);


var repSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    audit_id:{
        type: Schema.Types.ObjectId,
        ref: 'audit'
    },
    
});

module.exports = mongoose.model('rep', repSchema);
