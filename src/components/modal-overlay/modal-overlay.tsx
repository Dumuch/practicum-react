import React, { FC } from 'react';
import styles from './styles.module.css'

interface ModalOverlayProps {
    onClose: () => void
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
    return <div className={styles.overlay} onClick={onClose} data-testid={"overlay-modal"} />
};

export default ModalOverlay;
