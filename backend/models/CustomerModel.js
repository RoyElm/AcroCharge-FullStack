const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Missing first name."],
        minLength: [2, "First name must be minimum 2 chars."],
        maxLength: [50, "First name can't exceed 50 chars."],
    },
    last_name: {
        type: String,
        required: [true, "Missing last name."],
        minLength: [2, "Last name must be minimum 2 chars."],
        maxLength: [50, "Last name can't exceed 50 chars."],
    },
    email: {
        type: String,
        required: [true, "Missing email."],
        unique: [true, "Email already exist"],
        match: [/^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email isn't in the right syntax"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    country: {
        type: String,
        required: [true, "Missing country."],
        minLength: [2, "country must be minimum 2 chars."],
        maxLength: [50, "country can't exceed 50 chars."],
    },
    city: {
        type: String,
        required: [true, "Missing city."],
        minLength: [2, "city must be minimum 2 chars."],
        maxLength: [50, "city can't exceed 50 chars."],
    },
    street: {
        type: String,
        required: [true, "Missing street."],
        minLength: [2, "street must be minimum 2 chars."],
        maxLength: [50, "street can't exceed 50 chars."],
    },
    phone: {
        type: String,
        validate: {
            validator: function (phone) {
                return /\d{3}-\d{3}-\d{4}/.test(phone);
            },
            message: 'Phone is not a valid phone number! example: 887-564-6105'
        },
        required: [true, 'Phone number required']
    }
},
    {
        versionKey: false,
        id: false
    });

const CustomerModel = mongoose.model("CustomerModel", CustomerSchema, "Customers");

module.exports = CustomerModel;
