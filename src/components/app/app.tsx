import React, {useEffect} from 'react';
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
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../services";
import {fetchUser} from "../../services/user";
import PublicRouteElement from "../public-route-element/public-route-element";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchUser())
    }, []);

    return (
        <Router>
            <Routes>
                <Route path={routes.main} element={<MainPage/>}/>
                <Route path={routes.login} element={
                    <PublicRouteElement>
                        <LoginPage/>
                    </PublicRouteElement>
                }/>
                <Route path={routes.register} element={
                    <PublicRouteElement>
                        <RegisterPage/>
                    </PublicRouteElement>
                }/>
                <Route path={routes.forgotPassword} element={
                    <PublicRouteElement>
                        <ForgotPasswordPage/>
                    </PublicRouteElement>
                }/>
                <Route path={routes.resetPassword} element={
                    <PublicRouteElement>
                        <ResetPasswordPage/>
                    </PublicRouteElement>
                }/>
                <Route path={routes.profile.main} element={
                    <ProtectedRouteElement>
                        <ProfilePage/>
                    </ProtectedRouteElement>
                }>
                    <Route path={routes.profile.orders} element={
                        <ProtectedRouteElement>
                            <ProfilePage/>
                        </ProtectedRouteElement>
                    }/>
                </Route>
                <Route path={`${routes.ingredients}/:id`} element={<IngredientsPage/>}/>
                <Route path="*" element={<NotFound404Page/>}/>
            </Routes>
        </Router>
    );
}

export default App;