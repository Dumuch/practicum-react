import React, {FC, ReactNode} from 'react';
import styles from './styles.module.css';
import {Link as RouteLink} from 'react-router-dom';

interface LinkProps {
    icon?: ReactNode
    title: string
    disabled?: boolean
    href: string
    classname?: string
}

const Link: FC<LinkProps> = ({classname, icon, title, disabled = false, href}) => {
    return (
        <RouteLink to={href} className={`${styles.link} d-flex justify-between ${classname}`}>
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
