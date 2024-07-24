import React, {FC} from "react";
import styles from './styles.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {IIngredient, TOrder} from "../../models/common";
import {useAppDispatch, useAppSelector} from "../../services";
import {setCurrentOrder} from "../../services/common";

interface IProps {
    order: TOrder
    uri: string
    visibleStatus?: boolean
}

const MAX_VISIBLE_INGREDIENTS = 6

const OrderMinInfo: FC<IProps> = ({order, uri, visibleStatus = false}) => {
    const navigate = useNavigate();
    const allIngredients = useAppSelector((state) => state.ingredientsStore.ingredients)
    const dispatch = useAppDispatch()
    const {ingredients, name, number, createdAt, _id, status} = order

    const findIngredients: IIngredient[] = []

    ingredients.forEach(id => {
        const find = allIngredients.find(i => i._id === id)
        if (find) {
            findIngredients.push(find)
        }
    })

    const price = findIngredients.reduce((acc, {price}) => acc + price, 0)

    const onClick = () => {
        navigate(uri + '/' + _id)
        dispatch(setCurrentOrder(order))
    }

    let statusStr = 'Создан'
    let statusColor = ''

    switch (status) {
        case 'pending':
            statusStr = 'Готовится'
            statusColor = 'color-accent'
            break
        case 'done':
            statusStr = 'Выполнен'
            statusColor = 'color-success'
            break
    }

    return (
        <>
            <div className={`${styles.wrapper} p-5`} onClick={onClick}>
                <div className={`${styles.header} mb-4`}>
                    <span className={`text text_type_digits-default`}>#{number}</span>
                    <span className={'text text_type_main-small text_color_inactive'}><FormattedDate
                        date={new Date(createdAt)}/></span>
                </div>

                <h3 className={'text text_type_main-medium mb-4'}>{name}</h3>
                {visibleStatus && (
                    <p className={`text text_type_main-default mb-20 ${statusColor}`}>{statusStr}</p>
                )}

                <div className={styles.footer}>
                    <div className={styles.images}>
                        {findIngredients.slice(0, MAX_VISIBLE_INGREDIENTS - 1).map((ingredient, index) => {
                            return <img key={index} src={ingredient.image} alt={''}
                                        style={{zIndex: findIngredients.length - 1}}/>
                        })}

                        {
                            findIngredients.length > MAX_VISIBLE_INGREDIENTS - 1 && (
                                <div className={styles.wrapperLastImage}>
                                    {findIngredients.length - MAX_VISIBLE_INGREDIENTS !== 0 && (
                                        <div
                                            className={styles.counter}>+{findIngredients.length - MAX_VISIBLE_INGREDIENTS}</div>
                                    )}
                                    <img src={findIngredients[MAX_VISIBLE_INGREDIENTS - 1].image} alt={''}/>
                                </div>
                            )
                        }
                    </div>

                    <div className="d-flex justify-center mt-1 mb-1">
                        <span className={'text text_type_digits-default pr-2'}>{price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>

            </div>

        </>
    )
}

export default OrderMinInfo