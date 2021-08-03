import React from "react";
import { NavLink } from "react-router-dom";
import { TransactionModel } from "../../../Models/Transaction.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { deleteTransactionByIdAsync } from "../../../Services/Http_Services/Transactions_service";
import './TransactionCard.scss';

interface ITransactionCard {
    transaction: TransactionModel;
    deleteTransaction: (_id: string) => void
}

function TransactionCard({ transaction, deleteTransaction }: ITransactionCard) {

    const deleteTransactionAsync = async () => {
        try {
            await deleteTransactionByIdAsync(transaction._id);
            deleteTransaction(transaction._id);
        } catch (error) {
            console.log(errorsService.getError(error));
        }
    }

    return (
        <div className="TransactionCard">
            <button className="DeleteButton" onClick={deleteTransactionAsync}>Delete</button>
            <p>Customer Name: {transaction.customer.first_name} {transaction.customer.last_name}</p>
            <p>currency: {transaction.currency}</p>
            <p>total price: {transaction.total_price}</p>
            <p>Credit card type: {transaction.credit_card_type}</p>
            <NavLink to={`${GlobalPaths.transactionHandlerUrl}/${transaction._id}`} className="EditTransaction">Edit Transaction</NavLink>
        </div>
    );

}

export default TransactionCard;
