import React, {FC, ReactNode} from 'react';
import styles from './styles.module.css';
import {Link as RouteLink} from 'react-router-dom';

interface LinkProps {
    icon?: ReactNode
    title: string
    disabled?: boolean
    href: string
}

const Link: FC<LinkProps> = ({icon, title, disabled = false, href}) => {
    return (
        <RouteLink to={href} className={`${styles.link} d-flex justify-between pl-5 pr-5 pt-4 pb-4 mr-2`}>
            {icon && (
                <div className="pr-2">
                    {icon}
                </div>
            )}
            <span className={`${disabled && 'text_color_inactive'} text text_type_main-default`}>{title}</span>
        </RouteLink>
    );
};

export default Link;
