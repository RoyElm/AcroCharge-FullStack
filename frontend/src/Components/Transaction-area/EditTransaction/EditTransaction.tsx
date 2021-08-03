import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer.model";
import { TransactionModel } from "../../../Models/Transaction.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { getAllCustomersAsync } from "../../../Services/Http_Services/Customers_service";
import { getTransactionByIdAsync, updateTransactionAsync } from "../../../Services/Http_Services/Transactions_service";
import "./EditTransaction.css";

function EditTransaction() {

    const history = useHistory();
    const [transaction, setTransaction] = useState<TransactionModel>(null);
    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    const { _id } = useParams<{ _id: string }>()


    useEffect(() => {
        (async () => {
            try {
                const _transaction = await getTransactionByIdAsync(_id);
                setTransaction(_transaction);
            } catch (error) {
                console.log(errorsService.getError(error));
                history.push(GlobalPaths.homeUrl)
            }
        })()
    }, [_id,history]);
    const { register, handleSubmit, formState: { errors } } = useForm<TransactionModel>({ defaultValues: { ...transaction } });

    useEffect(() => {
        (async () => {
            try {
                const _customers = await getAllCustomersAsync();
                setCustomers(_customers)
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        })()
    }, []);


    async function submit(_transaction: TransactionModel): Promise<void> {
        try {
            _transaction._id = transaction._id;
            await updateTransactionAsync(_transaction)
            history.push(GlobalPaths.homeUrl);
        } catch (error) {
            console.log(errorsService.getError(error));
        }
    }

    const handleErrorByName = (name: string) => {
        const errorType = errors[name].type;
        if (errorType === 'required') return `${name} is required!`;

        if (errorType === 'minLength') return `${name} min length is 2`;
        if (errorType === 'maxLength') return `${name} max length is 50`;

        if (errorType === 'min') return `min ${name} is 0.4`;
        if (errorType === 'max') return `max ${name} is 100000`;

        if (errorType === 'pattern') return `Credit card number need to be between 13 digits to 20 digits`;

    }

    return (
        <div className="EditTransaction">
            {
                transaction && customers.length && <>
                    <h2>Transaction Number: {transaction._id}</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Customer:</td>
                                    <td>
                                        <select name="customer_id" {...register("customer_id", { required: true })} defaultValue={transaction.customer_id}>
                                            {customers.map(customer => <option key={customer._id} value={customer._id}>{customer.first_name} {customer.last_name}</option>)}
                                        </select>
                                    </td>
                                </tr>
                                {
                                    errors?.customer_id &&
                                    <tr>
                                        <td></td>
                                        <td className="error">
                                            {handleErrorByName('customer_id')}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>Total Price:</td>
                                    <td>
                                        <input type="number" name="total_price" step="0.01" {...register("total_price", { required: true, min: 0.4, max: 100000 })} defaultValue={transaction.total_price} />
                                    </td>
                                </tr>
                                {
                                    errors?.total_price &&
                                    <tr>
                                        <td></td>
                                        <td className="error">
                                            {handleErrorByName('total_price')}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>Currency:</td>
                                    <td>
                                        <input type="text" name="currency" step="0.01" {...register("currency", { required: true, minLength: 2, maxLength: 15 })} defaultValue={transaction.currency} />
                                    </td>
                                </tr>
                                {
                                    errors?.currency &&
                                    <tr>
                                        <td></td>
                                        <td className="error">
                                            {handleErrorByName('currency')}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>Credit Card Type:</td>
                                    <td>
                                        <input type="text" name="credit_card_type" {...register("credit_card_type", { required: true, minLength: 2, maxLength: 15 })} defaultValue={transaction.credit_card_type} />
                                    </td>
                                </tr>
                                {
                                    errors?.credit_card_type &&
                                    <tr>
                                        <td></td>
                                        <td className="error">
                                            {handleErrorByName('credit_card_type')}
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>Credit Card Number:</td>
                                    <td>
                                        <input type="text" name="credit_card_number" step="0.01" {...register("credit_card_number", { required: true, pattern: /^[0-9]{13,20}$/ })} defaultValue={transaction.credit_card_number} />
                                    </td>
                                </tr>
                                {
                                    errors?.credit_card_number &&
                                    <tr>
                                        <td></td>
                                        <td className="error">
                                            {handleErrorByName('credit_card_number')}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td><button>Send</button></td>
                                </tr>
                            </tfoot>

                        </table>
                    </form>
                </>
            }
        </div>
    );

}

export default EditTransaction;
