const mongoose = require("mongoose");

const resetPasswordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        uniqueId: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

module.exports = ResetPassword;
