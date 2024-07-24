import React, {FormEvent, useState} from 'react';
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../services";
import {updateUser} from "../../services/user";
import {UseForm} from "../../helpers/useForm";
import {IUpdateUserReq} from "../../models/common";
import ProfileLayout from "../../layouts/profile";

const Profile = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.userStore.user)

    const {values, onChange} = UseForm<IUpdateUserReq>({email: user?.email ?? '', name: user?.name ?? ''})
    const [password, setPassword] = useState('')

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
        <ProfileLayout>
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
        </ProfileLayout>
    );
};

export default Profile;