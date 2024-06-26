import React, {FormEvent, useEffect} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../../components/link/link";
import {routes} from "../index";
import {resetPassword} from "../../utils/burger-api";
import {useNavigate} from "react-router-dom";
import {UseForm} from "../../helpers/useForm";

const ResetPassword = () => {
    const {values, onChange} = UseForm<{password: string, token: string}>({password: '', token: ''})

    const navigate = useNavigate();

    useEffect(() => {
        const accessed = sessionStorage.getItem('forgotPasswordAccessed');
        if (!accessed) {
            navigate(routes.forgotPassword, { replace: true });
        }
        sessionStorage.removeItem('forgotPasswordAccessed');
    }, [navigate]);

    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await resetPassword(values.password, values.token)
            navigate(routes.login)
        } catch {}
    }



    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>

                <div className="mt-a mb-a">


                    <form className={'form mb-20'} onSubmit={onSubmit}>
                        <p className={'text text_type_main-medium text-align-center'}>Восстановление пароля</p>
                        <PasswordInput
                            value={values.password}
                            name={'password'}
                            extraClass="mb-2"
                            onChange={onChange('password')}
                        />

                        <Input
                            value={values.token}
                            onChange={onChange('token')}
                            name={'token'}
                            placeholder={'Введите код из письма'}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        />

                        <div className="width-fit ml-a mr-a">
                            <Button htmlType="submit" type="primary" size="large">
                                Сохранить
                            </Button>

                        </div>
                    </form>

                    <p className={'text text_type_main-default text-align-center mb-4 text_color_inactive d-flex justify-center'}>Вспомнили
                        пароль?
                        <Link navLink={false} classname={'ml-2 link'} title={'Войти'} href={routes.login}/>
                    </p>

                </div>
            </main>

        </div>
    );
};

export default ResetPassword;