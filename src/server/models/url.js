const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        urlRoute: {
            type: String,
            required: true,
        },
        encryptedUrl: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
