import OrderMinInfo from "../../components/order-min-info/order-min-info";
import React, {useEffect, useState} from "react";
import Modal from "../../components/modal/modal";
import FeedDetails from "../../components/feed-details/feed-details";
import ProfileLayout from "../../layouts/profile";
import {
    closeWSOrders,
    closeWSUserOrders,
    connectWSOrders,
    connectWSUserOrders,
    setCurrentOrder
} from "../../services/common";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services";
import {FeedDetailsPage, routes} from "../index";
import styles from './styles.module.css'

const ProfileOrders = () => {
    const [openDetailsPage, setOpenDetailsPage] = useState(true)
    const location = useLocation();
    const data = useAppSelector((state) => state.commonStore.userOrders.data)
    const currentOrder = useAppSelector((state) => state.commonStore.currentOrder)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(connectWSUserOrders())
        return () =>{
            dispatch(closeWSUserOrders())
        }
    }, []);

    const isOrdersPage = location.pathname.replace(/\/$/, '') === routes.profile.orders;
    const closeModal = () => {
        navigate(routes.profile.orders)
        dispatch(setCurrentOrder(null))
    }
    useEffect(() => {
        if (!data || !openDetailsPage) {
            return
        }
        const id = location.pathname.split('/')[3]

        if (id && !currentOrder ) {
            const find = data.orders.find(i => i._id === id)
            if (find) {
                setOpenDetailsPage(true)
                dispatch(setCurrentOrder(find))
            }
        } else if (isOrdersPage) {
            setOpenDetailsPage(false)
        }
    }, [currentOrder, location.pathname, data, dispatch, isOrdersPage, openDetailsPage]);

    return (
        <>
            {openDetailsPage ? (
                <FeedDetailsPage data={data}/>
            ) : (
                <ProfileLayout>
                    {!data ? (
                        <p>Загрузка заказов...</p>
                    ) : (
                        <>
                            {data.orders.length === 0 ? (
                                <p className={'text text_type_main-default'}>Еще нет заказов...</p>
                            ) : (
                                <ul className={`${styles.list} list`}>

                                    {data.orders.map((order) => {
                                        return <li key={order._id}><OrderMinInfo visibleStatus={true} order={order}
                                                                                 uri={routes.profile.orders}/></li>
                                    })}
                                </ul>
                            )}
                        </>)}

                    {currentOrder && !isOrdersPage && (
                        <Modal onClose={closeModal} title={'Детали заказа'}><FeedDetails
                            {...currentOrder}/></Modal>)}
                </ProfileLayout>
            )}
        </>

    )
}
export default ProfileOrders