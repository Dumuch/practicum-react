import React, {FormEvent} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import Link from "../../components/link/link";
import {routes} from "../index";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services";
import {loginUser} from "../../services/user";
import {UseForm} from "../../helpers/useForm";
import {ILoginReq} from "../../models/common";

const Login = () => {
    const {values, onChange} = UseForm<ILoginReq>({email: '', password: ''})
    const {error} = useAppSelector((state) => state.userStore)

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(loginUser(values)).unwrap()
            navigate(routes.main)
        } catch {

        }
    }
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>

                <div className="mt-a mb-a">

                    <form className={'form mb-20'} onSubmit={onSubmit}>
                        {error && (
                            <p className={'text text_type_main-medium text-align-center'}>{error}</p>
                        )}
                        <p className={'text text_type_main-medium text-align-center'}>Вход</p>
                        <EmailInput
                            onChange={onChange('email')}
                            value={values.email}
                            name={'email'}
                            isIcon={false}
                        />

                        <PasswordInput
                            onChange={onChange('password')}
                            value={values.password}
                            name={'password'}
                            extraClass="mb-2"
                        />

                        <div className="width-fit ml-a mr-a">
                            <Button htmlType="submit" type="primary" size="large">
                                Войти
                            </Button>

                        </div>
                    </form>

                    <p className={'text text_type_main-default text-align-center mb-4 text_color_inactive d-flex justify-center'}>Вы
                        - новый пользователь? <Link navLink={false} classname={'ml-2 link'} title={'Зарегистрироваться'}
                                                    href={routes.register}/></p>
                    <p className={'text text_type_main-default text-align-center text_color_inactive d-flex justify-center'}>Забыли
                        пароль? <Link navLink={false} classname={'ml-2 link'} title={'Восстановить пароль'}
                                      href={routes.forgotPassword}/></p>

                </div>
            </main>

        </div>
    );
};

export default Login;