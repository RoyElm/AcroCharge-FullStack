import React, { useEffect, useState } from "react";
import { TransactionModel } from "../../../Models/Transaction.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { getAllTransactionsAsync } from "../../../Services/Http_Services/Transactions_service";
import TransactionCard from "../TransactionCard/TransactionCard";
import './TransactionList.css';

function TransactionsList(): JSX.Element {
    const [transactions, setTransactions] = useState<TransactionModel[]>([]);

    useEffect(() => {
        ((async () => {
            try {
                const _transactions = await getAllTransactionsAsync();
                setTransactions(_transactions);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [])

    function deleteTransaction(_id: string): void {
        const _transactions = transactions.filter(transaction => transaction._id !== _id);
        setTransactions(_transactions);
    }

    return (
        <div className="TransactionsList">
            <h2>Transaction List</h2>
            <div className="Transactions">
                {transactions.map((transaction, index) => <TransactionCard key={index} transaction={transaction} deleteTransaction={deleteTransaction}/>)}
            </div>
        </div>
    );

}

export default TransactionsList;
