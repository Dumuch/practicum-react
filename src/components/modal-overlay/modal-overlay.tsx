import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css'

interface ModalOverlayProps {
    children: ReactNode
    onClose: () => void
}
const ModalOverlay:FC<ModalOverlayProps> = ({children, onClose}) => {
    return (
        <>
        <div className={styles.overlay} onClick={onClose}>
        </div>
            {children}
        </>
    );
};

export default ModalOverlay;
