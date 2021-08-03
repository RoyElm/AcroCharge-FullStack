const express = require("express");
const customerLogic = require("../business-logic-layer/customer-logic");
const errorsHelper = require("../helpers/errors-helper");
const customerModel = require("../models/CustomerModel");
const router = express.Router();

//getting all customers;
router.get("/", async (request, response) => {
    try {
        const allCustomers = await customerLogic.getAllCustomersAsync();
        response.json(allCustomers);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting customer by id;
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const customer = await customerLogic.getCustomerByIdAsync(_id);
        response.json(customer);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//delete customer;
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await customerLogic.deleteCustomerById(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//create a new customer;
router.post("/", async (request, response) => {
    try {
        const customer = new customerModel(request.body);

        const error = customer.validateSync();
        if (error) return response.status(400).send(errorsHelper.getError(error));

        const addedCustomer = await customerLogic.saveCustomerAsync(customer);
        response.status(201).json(addedCustomer);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//update customer 
router.put("/:_id", async (request, response) => {
    try {
        const customer = new customerModel(request.body);
        customer._id = request.params._id;

        const updatedCustomer = await customerLogic.updateCustomerInfoAsync(customer);
        if (!updatedCustomer)
            return response.status(404).send(`Customer has not found please try again`);
        response.json(updatedCustomer);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


module.exports = router;