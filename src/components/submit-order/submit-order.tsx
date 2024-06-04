import React, { FC, useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { createOrder, resetOrder } from '../../services/order';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services';

interface SubmitOrderProps {
    price: number
}

const SubmitOrder: FC<SubmitOrderProps> = ({ price }) => {
    const { applyIngredients, applyBun } = useSelector((state: RootState) => state.commonStore)
    const { order } = useSelector((state: RootState) => state.orderStore)

    const dispatch = useDispatch<AppDispatch>()

    const submit = () => {
        const ids = applyIngredients.map(ingredient => ingredient.data._id)
        if (applyBun) {
            ids.push(applyBun._id)
            ids.unshift(applyBun._id)
        }
        dispatch(createOrder(ids))
    }

    const closeModal = () =>{
        dispatch(resetOrder())
    }

    return (
        <div className="d-flex align-items-center justify-end mt-10">
            <div className={`${styles.costWrapper} d-flex mr-10 align-items-center`}>
                <span className={'text text_type_digits-medium pr-2'}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <Button htmlType="button" type="primary" size="large" onClick={submit} disabled={!applyBun}>
                Оформить заказ
            </Button>
            {order &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
};

export default SubmitOrder;
