import React from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../components/link/link";
import {routes} from "./index";

import stylesProfilePage from "./profile.module.css";


const Profile = () => {
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex mt-20`}>

                <div className='d-flex align-items-start'>
                    <div className={`${stylesProfilePage.sidebar} d-flex flex-column`}>
                        <nav>

                            <ul className={'list ml-0'}>
                                <li><Link title={'Профиль'} href={routes.profile.main}
                                          classnameText={'text_type_main-medium'} classname={'mt-6 mb-6'}/></li>
                                <li><Link title={'История заказов'} href={routes.profile.orders} disabled={true} classname={'mt-6 mb-6'}
                                          classnameText={'text_type_main-medium'}/></li>
                                <li><Link title={'Выход'} href={routes.profile.orders} disabled={true} classname={'mt-6 mb-6'}
                                          classnameText={'text_type_main-medium'}/></li>

                            </ul>
                        </nav>

                        <p className={'mt-20 text text_type_main-default text_color_inactive'}>В этом разделе вы можете изменить свои персональные данные</p>

                    </div>


                    <form className={'form ml-15 mb-20'}>
                        <Input
                            icon={'EditIcon'}
                            value={''}
                            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }}
                            name={'name'}
                            placeholder={'Имя'}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        />
                        <EmailInput
                            placeholder={'Логин'}
                            isIcon={true}
                            name={'login'}
                            value={''}
                            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }}/>

                        <PasswordInput
                            name={'password'}
                            extraClass="mb-2" value={''}
                            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }}/>
                    </form>


                </div>
            </main>

        </div>
    );
};

export default Profile;