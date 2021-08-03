import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TransactionModel } from "../../../Models/Transaction.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
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
            {transactions.length ? <>
                <h2>Transaction List</h2>
                <div className="Transactions">
                    {transactions.map((transaction, index) => <TransactionCard key={index} transaction={transaction} deleteTransaction={deleteTransaction} />)}
                </div>
            </> :
                <>
                    <h2>There is no transactions please add some</h2>
                    <p>
                        <NavLink className="AddTransactionLink" to={GlobalPaths.transactionHandlerUrl}>Add Transaction</NavLink>
                    </p>
                </>
            }
        </div>
    );

}

export default TransactionsList;
