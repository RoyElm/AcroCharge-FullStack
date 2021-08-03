const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing Customer Id."],
        ref: "CustomerModel"
    },
    total_price: {
        type: Number,
        required: [true, "Missing total price."],
        min: [0.4, "total Price can't be below 0.4."],
        max: [100000, "total Price can't exceed 100000."]
    },
    currency: {
        type: String,
        required: [true, "Missing Currency."],
        minLength: [2, "Currency must be minimum 2 chars."],
        maxLength: [15, "Currency can't exceed 10 chars."],
    },
    credit_card_type: {
        type: String,
        required: [true, "Missing credit card type."],
        minLength: [2, "Credit card type must be minimum 4 chars."],
        maxLength: [15, "Author can't exceed 15 chars."],
    },
    credit_card_number: {
        type: String,
        match: [/^[0-9]{13,20}$/, "Credit card number need to be between 13 digits to 20 digits"],
        required: [true, 'credit card number required']
    },

},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    }
);

TransactionSchema.virtual("customer", {
    ref: "CustomerModel",
    localField: "customer_id",
    foreignField: "_id",
    justOne: true
});

const TransactionModel = mongoose.model("TransactionModel", TransactionSchema, "Transactions");

module.exports = TransactionModel;
