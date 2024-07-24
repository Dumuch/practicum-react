import React, {FC} from "react";
import styles from './styles.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {routes} from "../../pages";
import {IIngredient, TOrder} from "../../models/common";
import {useAppDispatch, useAppSelector} from "../../services";
import {setCurrentOrder} from "../../services/common";

interface IProps extends TOrder {
}

const MAX_VISIBLE_INGREDIENTS = 6

const OrderMinInfo: FC<IProps> = (order) => {
    const navigate = useNavigate();
    const allIngredients = useAppSelector((state) => state.ingredientsStore.ingredients)
    const dispatch = useAppDispatch()
    const {ingredients, name, number, createdAt, _id} = order

    const findIngredients: IIngredient[] = []

    ingredients.forEach(id => {
        const find = allIngredients.find(i => i._id === id)
        if (find) {
            findIngredients.push(find)
        }
    })

    const price = findIngredients.reduce((acc, {price}) => acc + price, 0)

    const onClick = () => {
        navigate(routes.feed + '/' + _id)
        dispatch(setCurrentOrder(order))
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