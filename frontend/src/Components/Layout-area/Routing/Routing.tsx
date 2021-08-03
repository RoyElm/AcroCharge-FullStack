import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import AddCustomer from "../../Customer-area/AddCustomer/AddCustomer";
import CustomerList from "../../Customer-area/CustomerList/CustomerList";
import EditCustomer from "../../Customer-area/EditCustomer/EditCustomer";
import AddTransaction from "../../Transaction-area/AddTransaction/AddTransaction";
import EditTransaction from "../../Transaction-area/EditTransaction/EditTransaction";
import TransactionsList from "../../Transaction-area/TransactionList/TransactionList";

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path={GlobalPaths.homeUrl} component={TransactionsList} exact />
            <Route path={`${GlobalPaths.transactionHandlerUrl}`} component={AddTransaction} exact />
            <Route path={`${GlobalPaths.customerHandlerUrl}`} component={CustomerList} exact />
            <Route path={`${GlobalPaths.customerHandlerUrl}/add`} component={AddCustomer} exact />
            <Route path={`${GlobalPaths.transactionHandlerUrl}/:_id`} component={EditTransaction} exact />
            <Route path={`${GlobalPaths.customerHandlerUrl}/:_id`} component={EditCustomer} exact />
            <Redirect from="**" to="/" exact />
        </Switch>
    );
}

export default Routing;
