import React, {FC, ReactElement} from "react";
import {useAppSelector} from "../../services";
import {Navigate} from "react-router-dom";
import {routes} from "../../pages";

interface IPublicRouteElementProps {
    children: ReactElement;
}

const PublicRouteElement: FC<IPublicRouteElementProps> = ({children}) => {
    const user = useAppSelector((state) => state.userStore.user);

    return user ? <Navigate to={routes.profile.main} replace/> : children;
}

export default PublicRouteElement;