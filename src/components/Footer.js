import React from "react";

/**
 * Footer component for every page.
 *
 * @returns {*}
 * @constructor
 */
export default function Footer() {
    const dateToday = new Date();
    return (
        <>
            <div className="footer">
                <p className="footer-text">Copyright © 2020-{dateToday.getFullYear()} Argent Bank. All rights reserved.</p>
            </div>
        </>
    )
}