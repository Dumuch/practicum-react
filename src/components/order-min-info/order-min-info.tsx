import React from "react";
import styles from './styles.module.css'
import img from '../../images/img.jpg'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {routes} from "../../pages";

const OrderMinInfo = () => {
    const navigate = useNavigate();

    const onClick = () =>{
        navigate(routes.feed + '/12')
    }
    return (
        <div className={`${styles.wrapper} p-5`} onClick={onClick}>
            <div className={`${styles.header} mb-4`}>
                <span className={`text text_type_digits-default`}>#123123</span>
                <span  className={'text text_type_main-small text_color_inactive'}>Сегодня в 15.23</span>
            </div>

            <h3 className={'text text_type_main-medium mb-4'}>Бургер большой с картошкой</h3>

            <div className={styles.footer}>
                <div className={styles.images}>
                    <img src={img} alt={''} style={{zIndex: 6}}/>
                    <img src={img} alt={''} style={{left: '-10px', zIndex: 5}}/>
                    <img src={img} alt={''} style={{left: '-20px', zIndex: 4}}/>
                    <img src={img} alt={''} style={{left: '-30px', zIndex: 3}}/>
                    <img src={img} alt={''} style={{left: '-40px', zIndex: 2}}/>
                    <img src={img} alt={''} style={{left: '-50px', zIndex: 1}}/>
                    <div className={styles.wrapperLastImage} style={{left: '-60px'}}>
                        <div className={styles.counter}>+3</div>
                        <img src={img} alt={''}/>
                    </div>
                </div>

                <div className="d-flex justify-center mt-1 mb-1">
                    <span className={'text text_type_digits-default pr-2'}>100</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>

        </div>
    )
}

export default OrderMinInfo