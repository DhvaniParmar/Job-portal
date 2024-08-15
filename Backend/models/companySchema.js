import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyPhone: {
        type: Number,
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    companyLogo: {
        public_id: String,
        url: String
    },
    companyDescription: {
        type: String,
        required: true
    },
    companySize: {
        type: String,
        required: true
    },
    companySocials: {
        linkedIn: String,
        twitter: String,
        facebook: String,
        instagram: String
    },
    companyJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ]
})

export const Company = mongoose.model('Company', companySchema);