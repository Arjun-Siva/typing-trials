const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const isEmail = (mailId) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(mailId);
}

const isStrongPassword = (pass) => {
    // 8 characters, 1 letter, 1 number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}

// static signup method
userSchema.statics.signup = async function(email, username, password) {
    const exists = await this.findOne( {email} )

    if (exists){
        throw Error('Email already in use');
    }
    
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }
    if(!isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, username, password: hash});

    return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne( {email} )

    if (!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)