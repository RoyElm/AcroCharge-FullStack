import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { getAllCustomersAsync } from "../../../Services/Http_Services/Customers_service";
import CustomerCard from "../CustomerCard/CustomerCard";
import './CustomerList.css';

function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(() => {
        ((async () => {
            try {
                const _customers = await getAllCustomersAsync();
                setCustomers(_customers);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [])

    function deleteCustomer(_id: string): void {
        const _customers = customers.filter(customer => customer._id !== _id);
        setCustomers(_customers);
    }

    return (
        <div className="CustomerList">
            <NavLink className="addCustomer" to={GlobalPaths.customerHandlerUrl + "/add"}>Add Customer</NavLink>
            {customers.length ? <>
                <h2>Customer List</h2>
                <div className="Customers">
                    {customers.map((customer, index) => <CustomerCard key={index} customer={customer} deleteCustomer={deleteCustomer} />)}
                </div>
            </> :
                <>
                    <h2>There is no customers please add some</h2>
                </>
            }
        </div>
    );

}

export default CustomerList;
