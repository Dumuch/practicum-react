import React, { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

interface ModalProps {
    children: ReactNode
    onClose: () => void
    title?: string
}

const Modal: FC<ModalProps> = ({ children, onClose, title }) => {

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        if (!modalRoot) {
            return
        }

        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, []);


    if (!modalRoot) {
        return <></>
    }


    return (
        createPortal(
            (
                <ModalOverlay onClose={onClose}>
                    <div className={`${styles.modal} p-10`}>
                        {title ? (
                            <div className={styles.header}>
                                <p className={'text text_type_main-medium pr-10'}>{title}</p>
                                <button className={`${styles.closeButton} ${styles.closeButtonWithTitle}`}
                                        onClick={onClose}>
                                    <CloseIcon type="primary" />
                                </button>
                            </div>
                        ) : (
                            <button className={styles.closeButton}
                                    onClick={onClose}>
                                <CloseIcon type="primary" />
                            </button>
                        )}
                        {children}
                    </div>
                </ModalOverlay>
            ),
            modalRoot
        )
    )
}

export default Modal;
