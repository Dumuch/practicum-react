import React, {FormEvent} from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../../components/link/link";
import {routes} from "../index";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../services/user";
import {UseForm} from "../../helpers/useForm";
import {IRegisterReq} from "../../models/common";
import {useAppDispatch} from "../../services";

const Register = () => {
    const {values, onChange} = UseForm<IRegisterReq>({email: '', name: '', password: ''})

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(registerUser(values))
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
                        <p className={'text text_type_main-medium text-align-center'}>Регистрация</p>
                        <Input
                            value={values.name}
                            onChange={onChange('name')}
                            name={'name'}
                            placeholder={'Имя'}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        />
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
                                Зарегистрироваться
                            </Button>

                        </div>
                    </form>

                    <p className={'text text_type_main-default text-align-center mb-4 text_color_inactive d-flex justify-center'}>Уже
                        зарегистрированы?
                        <Link navLink={false} classname={'ml-2 link'} title={'Войти'} href={routes.login}/>
                    </p>

                </div>
            </main>

        </div>
    );
};

export default Register;