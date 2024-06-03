import React, { FC, useMemo } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { IIngredient } from '../../models/common';
import SubmitOrder from '../submit-order/submit-order';
import { groupIngredients, randomInt } from '../../helpers';

interface BurgerConstructorProps {
    ingredients: IIngredient[]
}


const BurgerConstructor: FC<BurgerConstructorProps> = ({ ingredients }) => {
    const { buns, sauces, mains } = useMemo(() => {
        return groupIngredients(ingredients)
    }, [ingredients])

    const applyIngredients = mains.slice(randomInt(1, mains.length - 1), randomInt(1, mains.length - 1)).concat(sauces.slice(randomInt(1, sauces.length - 1), randomInt(1, sauces.length - 1)))
    const applyBun: IIngredient | undefined = buns[randomInt(0, buns.length - 1)]

    const price = useMemo(() => {
        return (
            (applyBun ? applyBun.price * 2 : 0) +
            applyIngredients.reduce((acc, item) => acc + item.price, 0)
        );
    }, [applyBun, applyIngredients]);


    return (
        <div className={`${styles.wrapperBurgerIngredients} mt-25`}>
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
                {applyIngredients.map(ingredient => {
                    return (
                        <li key={ingredient._id} className="pl-8 mb-4 position-relative">
                            <div className={styles.dragButton}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
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
