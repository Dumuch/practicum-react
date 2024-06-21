import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../services";
import {fetchUser, refreshUserToken} from "../../services/user";
import {routes} from "../../pages";
import {Navigate, useLocation} from "react-router-dom";

interface IProtectedRouteElementProps {
    children: ReactElement
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({children}) => {
    const {user, loading} = useSelector((state: RootState) => state.userStore)

    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();

    const init = useCallback(async () => {
        if (loading === 'succeeded') {
            setUserLoaded(true);
            return
        }
        try {
            await dispatch(fetchUser()).unwrap()
        } catch {
            await dispatch(refreshUserToken()).unwrap()
            await dispatch(fetchUser()).unwrap()
        } finally {
            setUserLoaded(true);
        }
    }, [dispatch, loading]);

    useEffect(() => {
        init();
    }, [init]);

    if (!isUserLoaded) {
        return <></>;
    }


    return user ? children : <Navigate to={routes.login} replace state={{ from: location }}/>;
}

export default ProtectedRouteElement