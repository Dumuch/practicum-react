import React from 'react';
import img from '../../images/img.jpg'
import styles from './styles.module.css'

const OrderModal = () => {
    return (
        <div className={'mt-20 d-flex flex-column align-items-center mb-20'}>
            <p className={`${styles.orderNumber} text text_type_digits-large mb-8`}>0232322</p>
            <p className={'text text_type_main-medium mb-15'}>идентификатор заказа</p>
            <img src={img} className={'mb-15'} alt={''} />
            <p className={'text text_type_main-default mb-2'}>Ваш заказ начали готовить</p>
            <p className={'text text_type_main-default text_color_inactive'}>Дождитесь заказа на орбитальной станции</p>
        </div>
    );
};

export default OrderModal;
