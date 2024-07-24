import React from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import OrderMinInfo from "../../components/order-min-info/order-min-info";
import stylesFeed from "./styles.module.css";
import {useAppSelector} from "../../services";
import {TOrder} from "../../models/common";

const Profile = () => {
    const data = useAppSelector((state) => state.commonStore.orders.data)

    const sortByStatus = data?.orders.reduce((acc, data) => {
        if (data.status === 'done') {
            acc.done.push(data)
        }
        if (data.status === 'pending') {
            acc.pending.push(data)
        }
        return acc
    }, {done: [], pending: []} as { done: TOrder[], pending: TOrder[] }) ?? {done: [], pending: []}


    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex mt-20`}>
                {!data ? (
                    <p>Загрузка заказов...</p>
                ) : (
                    <>
                        <div className={`${styles.column} mr-10`}>
                            <section>
                                <h2 className={'text text_type_main-large mt-10 mb-5'}>Лента заказов</h2>
                                <ul className={`${stylesFeed.listOrders} list`}>
                                    {data.orders.map((order) => {
                                        return <li key={order._id}><OrderMinInfo {...order} /></li>
                                    })}
                                </ul>

                            </section>
                        </div>
                        <div className={styles.column}>
                            <div className={'d-flex mb-20'}>
                                <div className={`${stylesFeed.column} mr-15`}>
                                    <span className={'text text_type_main-medium'}>Готовы:</span>
                                    <ul className={`${stylesFeed.list} list mt-5`}>
                                        {sortByStatus.done.map(({number}) => {
                                            return (<li key={number}>
                                                <p className={`text text_type_digits-default ${stylesFeed.highlight}`}>{number}</p>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                                <div className={stylesFeed.column}>
                                    <span className={'text text_type_main-medium'}>В работе:</span>
                                    <ul className={'list mt-5'}>
                                        {sortByStatus.pending.map(({number}) => {
                                            return (<li key={number}>
                                                <p className={`text text_type_digits-default`}>{number}</p>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <span className={'text text_type_main-medium'}>Выполнено за все время:</span>
                            <p className={`text text_type_digits-large mb-15 text-neon`}>{data.total.toLocaleString('ru-RU')}</p>

                            <span className={'text text_type_main-medium'}>Выполнено за сегодня:</span>
                            <p className={`text text_type_digits-large text-neon`}>{data.totalToday}</p>

                        </div>
                    </>

                )}
            </main>

        </div>
    );
};

export default Profile;