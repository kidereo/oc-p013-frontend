import "./css/normalize.css";
import "./css/ab-main.css";
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

/**
 * Main app file.
 *
 * @returns {*}
 * @constructor
 */
export default function ArgentBank() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <nav>
                    <Header/>
                </nav>

                <main>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/sign-in" element={<SignIn/>}/>
                    </Routes>

                </main>

                <footer>
                    <Footer/>
                </footer>

            </BrowserRouter>

        </div>
    );
}
