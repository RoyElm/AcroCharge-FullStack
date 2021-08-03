import React from "react";
import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { deleteCustomerByIdAsync } from "../../../Services/Http_Services/Customers_service";
import './CustomerCard.css';

interface ICustomerCard {
    customer: CustomerModel;
    deleteCustomer: (_id: string) => void
}

function CustomerCard({ customer, deleteCustomer }: ICustomerCard) {

    const deleteCustomerAsync = async () => {
        try {
            await deleteCustomerByIdAsync(customer._id);
            deleteCustomer(customer._id);
        } catch (error) {
            console.log(errorsService.getError(error));
        }
    }

    return (
        <div className="CustomerCard">
            <button className="DeleteButton" onClick={deleteCustomerAsync}>Delete</button>
            <p>Full Name: {customer.first_name} {customer.last_name}</p>
            <p>Phone: {customer.phone}</p>
            <p>Email: {customer.email}</p>
            <p>Country: {customer.country}</p>
            <p>City: {customer.city}</p>
            <p>Street: {customer.street}</p>
            <p>Gender: {customer.gender}</p>
            <NavLink to={`${GlobalPaths.customerHandlerUrl}/${customer._id}`} className="EditCustomer">Edit Customer</NavLink>
        </div>
    );
}

export default CustomerCard;
