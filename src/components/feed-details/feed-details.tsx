import React from "react";
import styles from "./styles.module.css";
import img from "../../images/img.jpg";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const FeedDetails = () => {
    return (
        <div className={`${styles.container} d-flex mb-20 flex-column`}>
            <span className={`text text_type_digits-default mb-10 text-align-center`}>#123123</span>

            <h2 className={'text text_type_main-medium mb-5'}>БУргер уцкуц:</h2>
            <span className={'text text_type_main-default mb-20'}>Выполнен</span>

            <span className={'text text_type_main-medium'}>Состав:</span>
            <ul className={`${styles.list} list mt-5`}>
                <li>
                    <img src={img} alt={''}/>
                    <span className={`${styles.title} text text_type_main-default`}>Состав:</span>
                    <p className={`text text_type_digits-default`}> 2 x 41123434</p>
                    <CurrencyIcon type="primary"/>
                </li>
                <li>
                    <img src={img} alt={''}/>
                    <span className={`${styles.title} text text_type_main-small`}>Состав:</span>
                    <p className={`text text_type_digits-default`}> 2 x 41123434</p>
                    <CurrencyIcon type="primary"/>
                </li>
            </ul>
            <div className={`${styles.footer} mt-10`}>
                <span className={'text text_type_main-small'}>Вчера, 123</span>

                <div className={'d-flex align-items-center'}>
                    <p className={`text text_type_digits-default mr-2`}>500</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedDetails