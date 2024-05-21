import React, { FC } from 'react';
import styles from './styles.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../models/common';

interface IngredientCardProps {
    ingredient: IIngredient
}

const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
    return (
        <div className={'pb-10'}>
            <div className={'d-flex justify-center pl-4 pr-4 position-relative'}>
                {/*<Counter count={1} size="default" extraClass="m-1" />*/}
                <img src={ingredient.image} alt="" />
            </div>

            <div className="d-flex justify-center mt-1 mb-1">
                <span className={'text text_type_digits-default pr-2'}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <h4 className={`${styles.title} text text_type_main-default`}>{ingredient.name}</h4>
        </div>
    );
};

export default IngredientCard;
