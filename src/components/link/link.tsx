import React, {FC} from 'react';
import styles from './styles.module.css';
import {NavLink, Link as BrowserLink} from 'react-router-dom';
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface LinkProps {
    Icon?: ({type}: TIconProps) => JSX.Element
    title: string
    href: string
    classname?: string
    classnameText?: string
    activeClassName?: string
    navLink?: boolean
}

const Link: FC<LinkProps> = ({classname, classnameText = '', Icon, title, href, navLink = true}) => {

    const body = (isActive: boolean) => {
        return (
            <>
                {Icon && (
                    <div className="pr-2">
                        <Icon type={isActive ? 'primary' : 'secondary'}/>
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
                    {({isActive}) => body(isActive)}
                </NavLink>
            ) : (
                <BrowserLink to={href} className={`${styles.link} d-flex justify-between ${classname}}`
                }>
                    {body(false)}
                </BrowserLink>
            )}
        </>
    );

};

export default Link;
