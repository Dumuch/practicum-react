import React, {FC, ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../services";
import {Navigate} from "react-router-dom";
import {routes} from "../../pages";

interface IPublicRouteElementProps {
    children: ReactElement;
}

const PublicRouteElement: FC<IPublicRouteElementProps> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.userStore);

    return user ? <Navigate to={routes.profile.main} replace /> : children;
}

export default PublicRouteElement;