import React, { FC, useRef } from 'react';
import styles from '../burger-constructor/styles.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, sortApplyIngredients } from '../../services/common';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services';
import { IIngredient } from '../../models/common';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core'

interface BurgerConstructorIngredientProps {
    ingredient: IIngredient
    id: number
    index: number
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const BurgerConstructorIngredient: FC<BurgerConstructorIngredientProps> = ({ id, ingredient, index }) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(removeIngredient(id))
    }


    const ref = useRef<HTMLDivElement>(null)

    const useDropProps = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'ingredient-constructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(sortApplyIngredients({ dragIndex, hoverIndex }))

            item.index = hoverIndex;
        },
    })

    const [{ opacity }, drag, preview] = useDrag({
        type: 'ingredient-constructor',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.05 : 1,
        }),
    })

    drag(useDropProps[1](ref))

    return (
        <div ref={ref}>
            <div ref={preview} style={{ opacity }}>
                <div ref={drag} className={styles.dragButton}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
};

export default BurgerConstructorIngredient;
