import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../services";
import {fetchUser, refreshUserToken} from "../../services/user";
import {routes} from "../../pages";
import {Navigate, useLocation} from "react-router-dom";

interface IProtectedRouteElementProps {
    children: ReactElement
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({children}) => {
    const user = useAppSelector((state) => state.userStore.user)
    const loading = useAppSelector((state) => state.userStore.loading)

    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useAppDispatch()
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
        return <p>Загрузка очень важной информации</p>;
    }


    return user ? children : <Navigate to={routes.login} replace state={{from: location}}/>;
}

export default ProtectedRouteElement