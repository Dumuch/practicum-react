import React, {FC, useCallback, useEffect, useMemo, useRef} from 'react';
import styles from './styles.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import {IIngredient} from '../../models/common';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {groupIngredients} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../services';
import {setCurrentIngredient} from '../../services/common';
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../pages";


interface BurgerIngredientsProps {
    ingredients: IIngredient[]
}

const OFFSET_Y = 40

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ingredients}) => {
    const [current, setCurrent] = React.useState('one')

    const {currentIngredient} = useSelector((state: RootState) => state.commonStore)
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();
    const navigate = useNavigate();

    const oneTabRef = useRef<HTMLHeadingElement | null>(null)
    const twoTabRef = useRef<HTMLHeadingElement | null>(null)
    const threeTabRef = useRef<HTMLHeadingElement | null>(null)


    const {buns, sauces, mains} = useMemo(() => {
        return groupIngredients(ingredients)
    }, [ingredients])

    const openModal = useCallback((ingredient: IIngredient) => () => {
        sessionStorage.setItem('openModalIngredient', '1')
        navigate(routes.ingredients + '/' + ingredient._id)
        dispatch(setCurrentIngredient(ingredient))
    }, [dispatch, navigate])

    const closeModal = () => {
        navigate(routes.main)
        dispatch(setCurrentIngredient(null))
    }

    const scrollHandler = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const pageY = e.currentTarget.getBoundingClientRect().top

        if (pageY > (threeTabRef.current?.getBoundingClientRect().top ?? 0) - OFFSET_Y) {
            setCurrent('three')
        } else if (pageY > (twoTabRef.current?.getBoundingClientRect().top ?? 0) - OFFSET_Y) {
            setCurrent('two')
        } else {
            setCurrent('one')
        }
    }, [])

    useEffect(() => {
        if (!currentIngredient && location.pathname.includes(routes.ingredients) && sessionStorage.getItem('openModalIngredient')) {
            const id = location.pathname.split('/')[2]
            const ingredient = ingredients.find(ingredient => ingredient._id === id)
            ingredient && openModal(ingredient)()
        }
    }, [location, ingredients, currentIngredient, openModal]);


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
                                <IngredientCard ingredient={ingredient}/>
                            </li>
                        )
                    })}
                </ul>

                <h3 className={'text text_type_main-medium'} ref={twoTabRef}>Соусы</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {sauces.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient}/>
                            </li>
                        )
                    })}

                </ul>


                <h3 className={'text text_type_main-medium'} ref={threeTabRef}>Начинки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {mains.map(ingredient => {
                        return (
                            <li key={ingredient._id} onClick={openModal(ingredient)}>
                                <IngredientCard ingredient={ingredient}/>
                            </li>
                        )
                    })}

                </ul>
            </div>
            {currentIngredient && (<Modal onClose={closeModal} title={'Детали ингредиента'}><IngredientDetails
                ingredient={currentIngredient}/></Modal>)}
        </section>


    )
}

export default BurgerIngredients;
