import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface LinkProps {
    icon?: ReactNode
    title: string
    disabled?: boolean
}

const Link: FC<LinkProps> = ({ icon, title, disabled  = false}) => {
    return (
        <a href={'/'} className={`${styles.link} d-flex justify-between pl-5 pr-5 pt-4 pb-4 mr-2`}>
            {icon && (
                <div className="pr-2">
                    {icon}
                </div>
            )}
            <span className={`${disabled && 'text_color_inactive'} text text_type_main-default`}>{title}</span>
        </a>
    );
};

export default Link;
