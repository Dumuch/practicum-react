import React from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import OrderMinInfo from "../../components/order-min-info/order-min-info";
import stylesFeed from "./styles.module.css";

const Profile = () => {

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex mt-20`}>
                <div className={`${styles.column} mr-10`}>
                    <section>
                        <h2 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h2>

                        <OrderMinInfo/>
                    </section>
                </div>
                <div className={styles.column}>
                    <div className={'d-flex mb-20'}>
                        <div className={stylesFeed.column}>
                            <span className={'text text_type_main-medium'}>Готовы:</span>
                            <ul className={`${stylesFeed.list} list mt-5`}>
                                <li>
                                    <p className={`text text_type_digits-default`}>123123</p>
                                </li>
                                <li>
                                    <p className={`text text_type_digits-default`}>41123434</p>
                                </li>
                            </ul>
                        </div>
                        <div className={stylesFeed.column}>
                            <span className={'text text_type_main-medium'}>В работе:</span>
                            <ul className={'list mt-5'}>
                                <li>
                                    <p className={`text text_type_digits-default`}>123123</p>
                                </li>
                                <li>
                                    <p className={`text text_type_digits-default`}>41123434</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <span className={'text text_type_main-medium'}>Выполнено за все время:</span>
                    <p className={`text text_type_digits-large mb-15 text-neon`}>{(443355).toLocaleString('ru-RU')}</p>

                    <span className={'text text_type_main-medium'}>Выполнено за сегодня:</span>
                    <p className={`text text_type_digits-large text-neon`}>123</p>

                </div>
            </main>

        </div>
    );
};

export default Profile;