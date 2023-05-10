import validator from "validator";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A user must have a name"],
            trim: true,
            maxlength: [50, "Name must be less than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "A user must have a email"],
            trim: true,
            unique: [true, "A user must have a unique email"],
            lowercase: true,
            maxlength: [50, "Email must be less than 50 characters"],
            validate: validator.isEmail,
        },
        password: {
            type: String,
            trim: true,
            minlength: [7, "A password must contain at least 7 characters"],
        },
        role: {
            type: String,
            default: "user",
            enum: {
                values: ["user", "admin"],
                message: "Please select from this category",
            },
        },

        tokens: [
            {
                token: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Hiding private information
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;

    return userObject;
};

// Hashing Password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Getting jwt login token
userSchema.methods.getJwtLoginToken = async function () {
    const token = jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

// Checking is valid password
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Exporting Model
export default mongoose.model("User", userSchema);
