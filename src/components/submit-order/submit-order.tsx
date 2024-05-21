import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { currentBun, currentIngredients } from '../../utils/mock-data';


const SubmitOrder = () => {
    const total = currentIngredients.reduce((acc, item) =>{
       return acc + item.price
    },0)
    return (
        <div className="d-flex align-items-center justify-end mt-10">
            <div className={`${styles.costWrapper} d-flex mr-10 align-items-center`}>
                <span className={'text text_type_digits-medium pr-2'}>{total + currentBun.price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>

        </div>
    );
};

export default SubmitOrder;
