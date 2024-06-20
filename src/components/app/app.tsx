import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
    LoginPage,
    MainPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    IngredientsPage,
    NotFound404Page,
    routes
} from "../../pages";

function App() {

    return (
        <Router>
            <Routes>
                <Route path={routes.main} element={<MainPage/>}/>
                <Route path={routes.login} element={<LoginPage/>}/>
                <Route path={routes.register} element={<RegisterPage/>}/>
                <Route path={routes.forgotPassword} element={<ForgotPasswordPage/>}/>
                <Route path={routes.resetPassword} element={<ResetPasswordPage/>}/>
                <Route path={routes.profile.main} element={<ProfilePage/>}>
                    <Route path={routes.profile.orders} element={<ProfilePage/>}/>
                </Route>
                <Route path={`${routes.ingredients}/:id`} element={<IngredientsPage/>}/>
                <Route path="*" element={<NotFound404Page/>}/>
            </Routes>
        </Router>
    );
}

export default App;