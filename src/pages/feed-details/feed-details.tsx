import React, {useEffect} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import FeedDetails from "../../components/feed-details/feed-details";
import {useAppDispatch, useAppSelector} from "../../services";
import {setCurrentOrder} from "../../services/common";
import {useLocation} from "react-router-dom";
import stylesFeed from "./styles.module.css";

const FeedDetailsPage = () => {
    const data = useAppSelector((state) => state.commonStore.orders.data)
    const dispatch = useAppDispatch()
    const currentOrder = useAppSelector((state) => state.commonStore.currentOrder)
    const location = useLocation();

    useEffect(() => {
        if (!data) {
            return
        }
        const id = location.pathname.split('/')[2]
        if (id) {
            const find = data.orders.find(i => i._id === id)
            if (find) {
                dispatch(setCurrentOrder(find))
            }
        }
    }, [location.pathname, data, dispatch]);


    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container mt-20 d-flex`}>
                {!data || !currentOrder ? (
                    <p>Загрузка заказов...</p>
                ) : (
                    <div className={`${stylesFeed.container} d-flex justify-center`}>
                        <FeedDetails {...currentOrder} />
                    </div>
                )}
            </main>

        </div>
    )
}

export default FeedDetailsPage