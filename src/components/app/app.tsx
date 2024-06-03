import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { IIngredient } from '../../models/common';
import { getIngredients } from '../../utils/burger-api';

function App() {
    const [ingredients, setIngredients] = useState<IIngredient[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        getIngredients().then(setIngredients).catch(setError).finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader />
            <main className={`${styles.container} container d-flex justify-between`}>

                {loading && (<p>Загрузка ингредиентов...</p>)}
                {error && (<p>{error}</p>)}
                {!!ingredients.length && (
                    <>
                        <div className={`${styles.column} mr-10`}>
                            <BurgerIngredients ingredients={ingredients} />
                        </div>
                        <div className={styles.column}>
                            <BurgerConstructor ingredients={ingredients} />
                        </div>
                    </>
                )}
            </main>

        </div>
    );
}

export default App;
