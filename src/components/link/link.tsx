import React, {FC, ReactNode, useState} from 'react';
import styles from './styles.module.css';
import {NavLink} from 'react-router-dom';

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
    const [disabled, setDisabled] = useState(true)

    const toggleActive = (isActive: boolean) => {
        setDisabled(!isActive)
        return ''
    }

    return (
        <NavLink to={href}
                 className={({isActive}) =>
                     `${styles.link} d-flex justify-between ${classname} ${toggleActive(isActive)}`
                 }
        >
            {icon && (
                <div className="pr-2">
                    {icon}
                </div>
            )}
            <span
                className={`text text_type_main-default ${classnameText} ${navLink && disabled ? 'text_color_inactive' : ''}`}>{title}</span>
        </NavLink>
    );

};

export default Link;
