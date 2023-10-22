const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require("validator");
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format',
        },
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifytoken: {
        type: String,
    }
}, {
    timestamps: true,
}
)

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

};
const User = mongoose.model('User', userSchema);

module.exports = User;