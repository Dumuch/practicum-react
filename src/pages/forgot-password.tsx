import React from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../components/link/link";
import {routes} from "./index";

const ForgotPassword = () => {
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>

                <div className="mt-a mb-a">


                    <form className={'form mb-20'}>
                        <p className={'text text_type_main-medium text-align-center'}>Восстановление пароля</p>
                        <Input
                            value={''}
                            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }}
                            name={'email'}
                            placeholder={'Укажите email'}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        />

                        <div className="width-fit ml-a mr-a">
                            <Button htmlType="submit" type="primary" size="large">
                                Восстановить
                            </Button>

                        </div>
                    </form>

                    <p className={'text text_type_main-default text-align-center mb-4 text_color_inactive d-flex justify-center'}>Вспомнили
                        пароль?
                        <Link classname={'ml-2 link'} title={'Войти'} href={routes.login}/>
                    </p>

                </div>
            </main>

        </div>
    );
};

export default ForgotPassword;