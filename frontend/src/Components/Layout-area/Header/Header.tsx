import React from "react";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import "./Header.css";

function Header(): JSX.Element {

    return (
        <div className="Header">
            <nav>
                <NavLink to={GlobalPaths.homeUrl}>Home</NavLink>
                <NavLink to={GlobalPaths.customerHandlerUrl}>Customer Handler</NavLink>
                <NavLink to={GlobalPaths.transactionHandlerUrl}>Add Transaction</NavLink>
            </nav>
        </div>
    )
}

export default Header;
