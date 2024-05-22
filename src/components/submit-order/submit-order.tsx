import React, { FC, useMemo, useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { IIngredient } from '../../models/common';
import OrderModal from '../order-modal/order-modal';
import Modal from '../modal/modal';

interface SubmitOrderProps {
    applyIngredients: IIngredient[]
    applyBun?: IIngredient
}

const SubmitOrder: FC<SubmitOrderProps> = ({ applyIngredients, applyBun }) => {
    const [modal, setModal] = useState(false)

    const price = useMemo(() => {
        return (
            (applyBun ? applyBun.price * 2 : 0) +
            applyIngredients.reduce((acc, item) => acc + item.price, 0)
        );
    }, [applyBun, applyIngredients]);

    const toggleModal = () => {
        setModal(prev => !prev)
    }

    return (
        <div className="d-flex align-items-center justify-end mt-10">
            <div className={`${styles.costWrapper} d-flex mr-10 align-items-center`}>
                <span className={'text text_type_digits-medium pr-2'}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <Button htmlType="button" type="primary" size="large" onClick={toggleModal}>
                Оформить заказ
            </Button>
            {modal &&
                <Modal onClose={toggleModal}>
                    <OrderModal />
                </Modal>
            }
        </div>
    );
};

export default SubmitOrder;
