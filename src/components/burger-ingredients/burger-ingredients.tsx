import React, { FC, useMemo, useState } from 'react';
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IIngredient } from '../../models/common';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { groupIngredients } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services';
import { setCurrentIngredient } from '../../services/common';


interface BurgerIngredientsProps {
    ingredients: IIngredient[]
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('one')

    const {currentIngredient} = useSelector((state: RootState) => state.commonStore)
    const dispatch = useDispatch<AppDispatch>()

    const { buns, sauces, mains } = useMemo(() => {
        return groupIngredients(ingredients)
    }, [ingredients])

    const openModal = (ingredient: IIngredient) => () => {
        dispatch(setCurrentIngredient(ingredient))
    }

    const closeModal = () => {
        dispatch(setCurrentIngredient(null))

    }

    return (
        <section className={styles.wrapperBurgerConstructor}>
            <h2 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h2>
            <div className={'d-flex mb-10'}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.wrapperIngredients}>
                <h3 className={'text text_type_main-medium'}>Булки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {buns.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient} />
                            </li>
                        )
                    })}
                </ul>

                <h3 className={'text text_type_main-medium'}>Соусы</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {sauces.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient} />
                            </li>
                        )
                    })}

                </ul>


                <h3 className={'text text_type_main-medium'}>Начинки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {mains.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient} />
                            </li>
                        )
                    })}

                </ul>
            </div>
            {currentIngredient && (<Modal onClose={closeModal} title={'Детали ингредиента'}><IngredientDetails
                ingredient={currentIngredient} /></Modal>)}
        </section>


    )
}

export default BurgerIngredients;
