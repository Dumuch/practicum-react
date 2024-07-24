import React, {useEffect, useState} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import OrderMinInfo from "../../components/order-min-info/order-min-info";
import stylesFeed from "./styles.module.css";
import {useAppDispatch, useAppSelector} from "../../services";
import {TOrder} from "../../models/common";
import {FeedDetailsPage, routes} from "../index";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedDetails from "../../components/feed-details/feed-details";
import {setCurrentOrder} from "../../services/common";
import {chunkArray} from "../../helpers";

const Feed = () => {
    const [openDetailsPage, setOpenDetailsPage] = useState(true)
    const location = useLocation();
    const data = useAppSelector((state) => state.commonStore.orders.data)
    const currentOrder = useAppSelector((state) => state.commonStore.currentOrder)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const sortByStatus = data?.orders.reduce((acc, data) => {
        if (data.status === 'done') {
            acc.done.push(data)
        }
        if (data.status === 'pending') {
            acc.pending.push(data)
        }
        return acc
    }, {done: [], pending: []} as { done: TOrder[], pending: TOrder[] }) ?? {done: [], pending: []}

    const isFeedPage = location.pathname.replace(/\/$/, '') === routes.feed;

    const closeModal = () => {
        navigate(routes.feed)
        dispatch(setCurrentOrder(null))
    }

    useEffect(() => {
        if (!data || !openDetailsPage) {
            return
        }
        const id = location.pathname.split('/')[2]
        if (id && !currentOrder) {
            const find = data.orders.find(i => i._id === id)
            if (find) {
                setOpenDetailsPage(true)
                dispatch(setCurrentOrder(find))
            }
        } else if (isFeedPage) {
            setOpenDetailsPage(false)
        }
    }, [currentOrder, location.pathname, data?.orders, data, dispatch, isFeedPage, openDetailsPage]);

    return (
        <>
            {openDetailsPage ? (
                <FeedDetailsPage/>
            ) : (
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
                                                return <li key={order._id}><OrderMinInfo order={order}
                                                                                         uri={routes.feed}/></li>
                                            })}
                                        </ul>

                                    </section>
                                </div>
                                <div className={styles.column}>
                                    <div className={'d-flex mb-20'}>
                                        <div className={`${stylesFeed.column} mr-15`}>
                                            <span className={'text text_type_main-medium'}>Готовы:</span>

                                            <div className={'d-flex flex-wrap'}>
                                                {chunkArray(sortByStatus.done, 10).map((chunk, chunkIndex) => {
                                                    return (
                                                        <ul className={`${stylesFeed.list} list mt-5 mr-5`} key={chunkIndex}>
                                                            {chunk.map(({number}) => {
                                                                return (<li key={number}>
                                                                    <p className={`text text_type_digits-default ${stylesFeed.highlight}`}>{number}</p>
                                                                </li>)
                                                            })}
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={stylesFeed.column}>
                                            <span className={'text text_type_main-medium'}>В работе:</span>
                                            <div className={'d-flex flex-wrap'}>
                                                {chunkArray(sortByStatus.pending, 10).map((chunk, chunkIndex) => {
                                                    return (
                                                        <ul className={`${stylesFeed.list} list mt-5 mr-5`}
                                                            key={chunkIndex}>
                                                            {chunk.map(({number}) => {
                                                                return (<li key={number}>
                                                                    <p className={`text text_type_digits-default`}>{number}</p>
                                                                </li>)
                                                            })}
                                                        </ul>
                                                    )
                                                })}
                                            </div>
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

                    {currentOrder && !isFeedPage && (
                        <Modal onClose={closeModal} title={'Детали заказа'}><FeedDetails
                            {...currentOrder}/></Modal>)}
                </div>
            )}
        </>
    );
};

export default Feed;