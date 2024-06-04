import React, { FC, LegacyRef, UIEventHandler, useCallback, useMemo, useRef, useState } from 'react';
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

const OFFSET_Y = 40

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('one')

    const {currentIngredient} = useSelector((state: RootState) => state.commonStore)
    const dispatch = useDispatch<AppDispatch>()

    const oneTabRef = useRef<HTMLHeadingElement | null >(null)
    const twoTabRef = useRef<HTMLHeadingElement | null >(null)
    const threeTabRef = useRef<HTMLHeadingElement | null >(null)

    const { buns, sauces, mains } = useMemo(() => {
        return groupIngredients(ingredients)
    }, [ingredients])

    const openModal = (ingredient: IIngredient) => () => {
        dispatch(setCurrentIngredient(ingredient))
    }

    const closeModal = () => {
        dispatch(setCurrentIngredient(null))
    }

    const scrollHandler = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const pageY = e.currentTarget.getBoundingClientRect().top

        if(pageY > (threeTabRef.current?.getBoundingClientRect().top ?? 0) - OFFSET_Y) {
            setCurrent('three')
        } else if(pageY > (twoTabRef.current?.getBoundingClientRect().top ?? 0) - OFFSET_Y){
            setCurrent('two')
        } else {
            setCurrent('one')
        }
    },[])

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
            <div className={styles.wrapperIngredients} onScroll={scrollHandler}>
                <h3 className={'text text_type_main-medium'} ref={oneTabRef}>Булки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {buns.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient} />
                            </li>
                        )
                    })}
                </ul>

                <h3 className={'text text_type_main-medium'} ref={twoTabRef}>Соусы</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {sauces.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient} />
                            </li>
                        )
                    })}

                </ul>


                <h3 className={'text text_type_main-medium'} ref={threeTabRef}>Начинки</h3>
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
