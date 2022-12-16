import "./css/normalize.css";
import "./css/ab-main.css";
import "./css/loader.css";
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

/**
 * Main app file.
 *
 * @returns {*}
 * @constructor
 */
export default function ArgentBank() {
    const {isSuccess, user} = useSelector((state) => state.auth);
    const userSignedIn = isSuccess || user;
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
                        <Route path="/profile" element={userSignedIn ? <Profile/> : <SignIn/>}/>
                        <Route path="/profile/:profileId" element={<Profile/>}/>
                    </Routes>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </BrowserRouter>
        </div>
    );
}
