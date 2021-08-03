import React from "react";
import "./Footer.css";

function Footer(): JSX.Element {

    return (
        <div className="Footer">
            <p>
                All rights reserved to Roy Elmakies &copy;{new Date().getFullYear()}
            </p>
        </div >
    );
}

export default Footer;
