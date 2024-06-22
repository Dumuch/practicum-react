import React, { FC, useMemo } from 'react';
import styles from './styles.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../models/common';
import { useDrag } from 'react-dnd';
import {useAppSelector} from '../../services';

interface IngredientCardProps {
    ingredient: IIngredient
}

const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
    const applyIngredients = useAppSelector((state) => state.commonStore.applyIngredients)
    const applyBun = useAppSelector((state) => state.commonStore.applyBun)

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });


    const count = useMemo(() => {
        const countFromApplyIngredients = applyIngredients.filter(({ data: applyIngredient }) => applyIngredient._id === ingredient._id).length
        if (applyBun?._id === ingredient._id) {
            return 1
        }
        return countFromApplyIngredients > 0 ? countFromApplyIngredients : 0
    }, [applyIngredients, applyBun, ingredient])

    return (
        <div className={`pb-10 ${isDrag && styles.draggable}`} ref={dragRef}>
            <div className={'d-flex justify-center pl-4 pr-4 position-relative'}>
                {count > 0 && (
                    <Counter count={count} size="default" extraClass="m-1" />

                )}
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
