import React, {FC, ReactNode, useCallback, useEffect} from 'react';
import {createPortal} from 'react-dom';
import styles from './styles.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

interface ModalProps {
    children: ReactNode
    onClose: () => void
    title?: string
}

const Modal: FC<ModalProps> = ({children, onClose, title}) => {

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }, [onClose])

    useEffect(() => {
        if (!modalRoot) {
            return
        }

        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown]);


    if (!modalRoot) {
        return <></>
    }


    return (
        createPortal(
            (
                <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={`${styles.modal} p-10`}>
                        <div className={styles.header}>
                            {title && <p className={'text text_type_main-medium pr-10'}>{title}</p>}

                            <button className={`${styles.closeButton} ${title ? styles.closeButtonWithTitle : ''}`}
                                    onClick={onClose}>
                                <CloseIcon type="primary"/>
                            </button>
                        </div>
                        <div className={`${styles.body} mt-5`}>
                            {children}
                        </div>
                    </div>
                </>
            ),
            modalRoot
        )
    )
}

export default Modal;
