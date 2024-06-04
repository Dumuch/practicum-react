import React, { FC, useMemo } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { IIngredient } from '../../models/common';
import SubmitOrder from '../submit-order/submit-order';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services';
import { addIngredient, removeIngredient, setApplyBun } from '../../services/common';

interface BurgerConstructorProps {
    ingredients: IIngredient[]
}


const BurgerConstructor: FC<BurgerConstructorProps> = () => {
    const { applyIngredients, applyBun } = useSelector((state: RootState) => state.commonStore)
    const dispatch = useDispatch<AppDispatch>()

    const price = useMemo(() => {
        return (
            (applyBun ? applyBun.price * 2 : 0) +
            applyIngredients.reduce((acc, { data }) => acc + data.price, 0)
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
                {applyIngredients.map(({ id, data: ingredient }) => {
                    const handleClose = () =>{
                        dispatch(removeIngredient(id))
                    }
                    return (
                        <li key={id} className="pl-8 mb-4 position-relative">
                            <div className={styles.dragButton}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={handleClose}
                            />
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

            <SubmitOrder price={price} />
        </div>
    );
};

export default BurgerConstructor;
