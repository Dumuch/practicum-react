import React, {FC, ReactNode, useState} from 'react';
import styles from './styles.module.css';
import {NavLink, Link as BrowserLink} from 'react-router-dom';

interface LinkProps {
    icon?: ReactNode
    title: string
    href: string
    classname?: string
    classnameText?: string
    activeClassName?: string
    navLink?: boolean
}

const Link: FC<LinkProps> = ({classname, classnameText = '', icon, title, href, navLink = true}) => {

    const body = () => {
        return (
            <>
                {icon && (
                    <div className="pr-2">
                        {icon}
                    </div>
                )}
                <span
                    className={`text text_type_main-default ${classnameText}`}>{title}</span>
            </>
        )
    }

    return (
        <>
            {navLink ? (
                <NavLink to={href}
                         className={({isActive}) =>
                             `${styles.link} d-flex justify-between ${classname} ${!isActive ? styles.inActive : ''}`
                         }
                >
                    {body()}
                </NavLink>
            ) : (
                <BrowserLink to={href} className={`${styles.link} d-flex justify-between ${classname}}`
                }>
                    {body()}
                </BrowserLink>
            )}
        </>
    );

};

export default Link;
