import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'Tên đăng nhập không được để trống',
    },
    password: {
        type: String,
        trim: true,
        required: 'Mật khẩu không được để trống',
    },
    salt: String,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
});

UserSchema
    .virtual('plainPassword') // Renamed virtual path
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.password;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
};

const User = mongoose.model('User', UserSchema);

export default User;
