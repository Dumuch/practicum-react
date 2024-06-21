import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../services";
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {IIngredient} from "../models/common";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

const Ingredients = () => {
    const {ingredients, error, loading} = useSelector((state: RootState) => state.ingredientsStore)
    const location = useLocation();
    const [currentIngredient, setCurrentIngredient] = useState<IIngredient | null>(null)


    useEffect(() => {
        const id = location.pathname.split('/')[2]
        const findIngredient = ingredients.find((ingredient) => ingredient._id === id)
        findIngredient && setCurrentIngredient(findIngredient)
    }, [ingredients, location.pathname]);

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center mt-20`}>
                {loading === 'pending' && (<p>Загрузка ингредиентов...</p>)}
                {error && (<p>{error}</p>)}
                {currentIngredient && (
                    <IngredientDetails ingredient={currentIngredient}/>
                )}
            </main>

        </div>
    );
};

export default Ingredients;