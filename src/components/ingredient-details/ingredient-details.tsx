import React, { FC } from 'react';
import { IIngredient } from '../../models/common';
import styles from './styles.module.css';

interface IngredientModalProps {
    ingredient: IIngredient
}

const IngredientDetails: FC<IngredientModalProps> = ({ ingredient }) => {
    return (
        <div>
            <div className={'pb-10'}>
                <div className={'d-flex justify-center pl-4 pr-4 position-relative'}>
                    <img src={ingredient.image} alt="" />
                </div>

                <div className="d-flex justify-center mt-4 mb-8">
                    <h4 className={`${styles.title} text text_type_main-medium`} data-testid={'ingredient-details-title'}>{ingredient.name}</h4>
                </div>

                <ul className={`${styles.list} list d-flex flex-wrap mb-15`}>
                    <li>
                        <div className={'text text_type_main-default text_color_inactive'}>Калории,ккал</div>
                        <div className={'text text_type_main-default text_color_inactive'}>{ingredient.calories}</div>
                    </li>
                    <li>
                        <div className={'text text_type_main-default text_color_inactive'}>Белки, г</div>
                        <div className={'text text_type_main-default text_color_inactive'}>{ingredient.proteins}</div>
                    </li>
                    <li>
                        <div className={'text text_type_main-default text_color_inactive'}>Жиры, г</div>
                        <div className={'text text_type_main-default text_color_inactive'}>{ingredient.fat}</div>
                    </li>
                    <li>
                        <div className={'text text_type_main-default text_color_inactive'}>Углеводы, г</div>
                        <div
                            className={'text text_type_main-default text_color_inactive'}>{ingredient.carbohydrates}</div>
                    </li>
                </ul>

            </div>

        </div>
    );
};

export default IngredientDetails;
