import React, {FC, useMemo} from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import {IIngredient} from '../../models/common';
import SubmitOrder from '../submit-order/submit-order';
import {useDrop} from 'react-dnd';
import {useAppDispatch, useAppSelector} from '../../services';
import {addIngredient, setApplyBun} from '../../services/common';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';

interface BurgerConstructorProps {
    ingredients: IIngredient[]
}


const BurgerConstructor: FC<BurgerConstructorProps> = () => {
    const applyIngredients = useAppSelector((state) => state.commonStore.applyIngredients)
    const applyBun = useAppSelector((state) => state.commonStore.applyBun)
    const dispatch = useAppDispatch()

    const price = useMemo(() => {
        return (
            (applyBun ? applyBun.price * 2 : 0) +
            applyIngredients.reduce((acc, {data}) => acc + data.price, 0)
        );
    }, [applyBun, applyIngredients]);

    const onDropHandler = (ingredient: IIngredient) => {
        if (ingredient.type === 'bun') {
            dispatch(setApplyBun(ingredient))
        } else {
            dispatch(addIngredient(ingredient))
        }
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient: IIngredient) {
            onDropHandler(ingredient);
        },
    });


    return (
        <div ref={dropTarget} className={`${styles.wrapperBurgerIngredients} mt-25`}>
            {price === 0 ? (
                <p className={'text text_type_main-medium'}>Добавьте свои ингредиенты</p>
            ) : (
                <>
                    {applyBun &&
                        <div className="pl-8 mb-4">
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={applyBun.name + ' (верх)'}
                                price={applyBun.price}
                                thumbnail={applyBun.image}
                            />
                        </div>
                    }
                    <ul className={`${styles.list} list`}>
                        {applyIngredients.map(({id, data: ingredient}, index) => {

                            return (
                                <li key={id} className="pl-8 mb-4 position-relative">
                                    <BurgerConstructorIngredient key={id} ingredient={ingredient} id={id}
                                                                 index={index}/>
                                </li>
                            )
                        })}


                    </ul>
                    {applyBun &&
                        <div className="pl-8 mt-4 mb-4">
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={applyBun.name + ' (низ)'}
                                price={applyBun.price}
                                thumbnail={applyBun.image}
                            />
                        </div>
                    }
                </>
            )}

            <SubmitOrder price={price}/>
        </div>
    );
};

export default BurgerConstructor;
