import React, {FormEvent, useState} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../../components/link/link";
import {routes} from "../index";

import stylesProfilePage from "./profile.module.css";
import {useAppDispatch, useAppSelector} from "../../services";
import {logoutUser, updateUser} from "../../services/user";
import {UseForm} from "../../helpers/useForm";
import {IUpdateUserReq} from "../../models/common";


const Profile = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.userStore.user)

    const {values, onChange} = UseForm<IUpdateUserReq>({email: user?.email ?? '', name: user?.name ?? ''})
    const [password, setPassword] = useState('')


    const onClick = async () => {
        await dispatch(logoutUser())
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // await dispatch(registerUser({email, name, password})).unwrap()
        } catch {
        }
    }

    const onUpdateUser = async () => {
        await dispatch(updateUser(values))

    }

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


                    <form className={'form ml-15 mb-20'} onSubmit={onSubmit}>
                        <Input
                            icon={'EditIcon'}
                            value={values.name}
                            onChange={onChange('name')}
                            name={'name'}
                            placeholder={'Имя'}
                            onBlur={onUpdateUser}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        />
                        <EmailInput
                            placeholder={'Логин'}
                            isIcon={true}
                            name={'login'}
                            value={values.email}
                            onBlur={onUpdateUser}
                            onChange={onChange('email')}
                        />

                        <PasswordInput
                            name={'password'}
                            extraClass="mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>


                </div>
            </main>

        </div>
    );
};

export default Profile;