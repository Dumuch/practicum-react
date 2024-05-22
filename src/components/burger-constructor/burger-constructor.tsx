import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { IIngredient } from '../../models/common';

interface BurgerConstructorProps {
    applyIngredients: IIngredient[]
    applyBun: IIngredient
}


const BurgerConstructor: FC<BurgerConstructorProps> = ({ applyIngredients, applyBun }) => {

    return (
        <div className={`${styles.wrapperBurgerIngredients} mt-25`}>
            <div className="pl-8 mb-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={applyBun.name + ' (верх)'}
                    price={applyBun.price}
                    thumbnail={applyBun.image}
                />
            </div>
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
            <div className="pl-8 mt-4 mb-4">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={applyBun.name + ' (низ)'}
                    price={applyBun.price}
                    thumbnail={applyBun.image}
                />
            </div>
        </div>
    );
};

export default BurgerConstructor;
