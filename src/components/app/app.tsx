import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {LoginPage, MainPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFound404Page} from "../../pages";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
                <Route path="*" element={<NotFound404Page/>}/>
            </Routes>
        </Router>
    );
}

export default App;