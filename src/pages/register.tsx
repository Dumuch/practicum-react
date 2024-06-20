import React, {useState} from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../components/link/link";
import {routes} from "./index";

const Register = () => {
    const [value, setValue] = useState('')

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>

                <div className="mt-a mb-a">


                    <form className={'form mb-20'}>
                        <p className={'text text_type_main-medium text-align-center'}>Регистрация</p>
                        <Input
                            value={''}
                            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.');
                            }}
                            name={'name'}
                            placeholder={'Имя'}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        />
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
                                Зарегистрироваться
                            </Button>

                        </div>
                    </form>

                    <p className={'text text_type_main-default text-align-center mb-4 text_color_inactive d-flex justify-center'}>Уже
                        зарегистрированы?
                        <Link classname={'ml-2 link'} title={'Войти'} href={routes.login}/>
                    </p>

                </div>
            </main>

        </div>
    );
};

export default Register;