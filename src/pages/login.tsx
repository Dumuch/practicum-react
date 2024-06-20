import React, {useState} from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import Link from "../components/link/link";
import {routes} from "./index";

const Login = () => {
    const [value, setValue] = useState('')

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>

                <div className="mt-a mb-a">


                    <form className={'form mb-20'}>
                        <p className={'text text_type_main-medium text-align-center'}>Вход</p>
                        <EmailInput
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            name={'email'}
                            isIcon={false}
                        />

                        <PasswordInput
                            onChange={e => setValue(e.target.value)}
                            value={value}
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
                        - новый пользователь? <Link classname={'ml-2 link'} title={'Зарегистрироваться'}
                                                    href={routes.register}/></p>
                    <p className={'text text_type_main-default text-align-center text_color_inactive d-flex justify-center'}>Забыли
                        пароль? <Link classname={'ml-2 link'} title={'Восстановить пароль'}
                                      href={routes.forgotPassword}/></p>

                </div>
            </main>

        </div>
    );
};

export default Login;