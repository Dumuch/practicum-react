import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import stylesLayout from "./styles-profile.module.css";
import Link from "../components/link/link";
import {routes} from "../pages";
import React, {FC, ReactNode} from "react";
import {logoutUser} from "../services/user";
import {useAppDispatch} from "../services";

const ProfileLayout: FC<{ children: ReactNode }> = ({children}) => {
    const dispatch = useAppDispatch()

    const onClick = async () => {
        await dispatch(logoutUser())
    }
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex mt-20`}>

                <div className={`${stylesLayout.container} d-flex align-items-start`}>
                    <div className={`${stylesLayout.sidebar} d-flex flex-column`}>
                        <nav>

                            <ul className={'list ml-0'}>
                                <li><Link title={'Профиль'} href={routes.profile.main}
                                          classnameText={'text_type_main-medium'} classname={'mt-6 mb-6'}/></li>
                                <li><Link title={'История заказов'} href={routes.profile.orders}
                                          classname={'mt-6 mb-6'}
                                          classnameText={'text_type_main-medium'}/></li>
                                <li onClick={onClick}><Link title={'Выход'} href={routes.login}
                                                            classname={'mt-6 mb-6'}
                                                            classnameText={'text_type_main-medium'}/></li>

                            </ul>
                        </nav>

                        <p className={'mt-20 text text_type_main-default text_color_inactive'}>В этом разделе вы можете
                            изменить свои персональные данные</p>

                    </div>
                    {
                        children
                    }
                </div>
            </main>
        </div>

    )
}

export default ProfileLayout