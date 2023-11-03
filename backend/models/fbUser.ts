import mongoose from 'mongoose';

const facebookUserSchema = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: false
    },
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    gender: String,
    profileUrl: String,
    provider: {
        type: String,
        default: 'facebook'
    },
    _raw: String,
    _json: {
        type: Object
    }
});

const FacebookUser = mongoose.model('FacebookUser', facebookUserSchema);

export default FacebookUser;
