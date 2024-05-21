import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { currentBun, currentIngredients } from '../../utils/mock-data';


const BurgerIngredients = () => {

    return (
        <div className={`${styles.wrapperBurgerIngredients} mt-25`}>
            <div className="pl-8 mb-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={currentBun.name}
                    price={currentBun.price}
                    thumbnail={currentBun.image}
                />
            </div>
            <ul className={`${styles.list} list`}>
                {currentIngredients.map(i =>{
                    return (
                        <li className="pl-8 mb-4 position-relative">
                            <div className={styles.dragButton}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                text={i.name}
                                price={i.price}
                                thumbnail={i.image}
                            />
                        </li>
                    )
                })}


            </ul>
            <div className="pl-8 mt-4 mb-4">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={currentBun.name}
                    price={currentBun.price}
                    thumbnail={currentBun.image}
                />
            </div>
        </div>
    );
};

export default BurgerIngredients;
