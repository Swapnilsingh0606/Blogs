const { createHmac, randomBytes } = require("crypto");
const { Schema, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: './images/default.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true});

userSchema.static("matchPassword", async function (email, password) {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHashed = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if (hashedPassword !== userProvidedHashed) 
        throw new Error("Incorrect password");

    return user;
});

const User = mongoose.model('user', userSchema);

module.exports = User;