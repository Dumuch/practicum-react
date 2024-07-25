import React, {FC} from "react";
import styles from "./styles.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {EStatusOrderUI, IIngredient, TOrder} from "../../models/common";
import {useAppSelector} from "../../services";

interface IProps extends TOrder {
}

const FeedDetails: FC<IProps> = (order) => {
    const {ingredients, name, number, status, createdAt} = order
    const allIngredients = useAppSelector((state) => state.ingredientsStore.ingredients)

    const findIngredientsByGroup: { ingredient: IIngredient, quantity: number }[] = []

    const groupIngredients = ingredients.reduce((acc, id) => {
        if (acc[id]) {
            acc[id] = acc[id] + 1
        } else {
            acc[id] = 1
        }
        return acc
    }, {} as Record<string, number>)


    for (const id in groupIngredients) {
        const find = allIngredients.find(i => i._id === id)
        if (find) {
            findIngredientsByGroup.push({
                ingredient: find,
                quantity: groupIngredients[id]
            })
        }

    }

    const price = findIngredientsByGroup.reduce((acc, {ingredient, quantity}) => acc + ingredient.price * quantity, 0)

    return (
        <div className={`${styles.container} d-flex flex-column`}>
            <span className={`text text_type_digits-default mb-10 text-align-center`}>#{number}</span>

            <h2 className={'text text_type_main-medium mb-5'}>{name}:</h2>
            <span className={`${styles.status} text text_type_main-default mb-20`}>{EStatusOrderUI[status]}</span>

            <span className={'text text_type_main-medium'}>Состав:</span>
            <ul className={`${styles.list} list mt-5`}>
                {findIngredientsByGroup.map(({ingredient, quantity}) => {
                    return (
                        <li key={ingredient._id}>
                            <img src={ingredient.image_mobile} alt={''}/>
                            <span className={`${styles.title} text text_type_main-default`}>{ingredient.name}:</span>
                            <p className={`text text_type_digits-default`}>{quantity} x {ingredient.price}</p>
                            <CurrencyIcon type="primary"/>
                        </li>
                    )
                })}
            </ul>
            <div className={`${styles.footer} mt-10`}>
                <span className={'text text_type_main-small text_color_inactive'}><FormattedDate
                    date={new Date(createdAt)}/></span>

                <div className={'d-flex align-items-center'}>
                    <p className={`text text_type_digits-default mr-2`}>{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default FeedDetails