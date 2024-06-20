import React, {useEffect, useState} from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services";
import {fetchIngredients} from "../services/ingredients";

const Main = () => {
    const [loading, setLoading] = useState(false)

    const {ingredients, error} = useSelector((state: RootState) => state.ingredientsStore)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setLoading(true)

        dispatch(fetchIngredients()).finally(() =>{
            setLoading(false)
        })
    }, [dispatch]);

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-between`}>

                {loading && (<p>Загрузка ингредиентов...</p>)}
                {error && (<p>{error}</p>)}
                {!!ingredients.length && (
                    <DndProvider backend={HTML5Backend}>
                        <div className={`${styles.column} mr-10`}>
                            <BurgerIngredients ingredients={ingredients}/>
                        </div>
                        <div className={styles.column}>
                            <BurgerConstructor ingredients={ingredients}/>
                        </div>
                    </DndProvider>
                )}
            </main>

        </div>
    );
};

export default Main;