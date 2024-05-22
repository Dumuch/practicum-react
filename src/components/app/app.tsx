import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { IIngredient } from '../../models/common';
import { API } from '../../constants';

function App() {
    const [ingredients, setIngredients] = useState<IIngredient[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(API.ingredients).then(r => r.json()).catch(e => {
            setError('Сервер не доступен')
        }).then(({ data, success }) => {
            if (success) {
                setIngredients(data)
            } else {
                setError('Сервер не доступен')
            }
        }).finally(() =>{
            setLoading(false)
        })
    }, []);






    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader />
            <main className={`${styles.container} container d-flex justify-between`}>
                {loading ? (
                    <p>Загрузка ингредиентов...</p>
                ) : (
                    <>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <>
                                <div className={`${styles.column} mr-10`}>
                                    <BurgerIngredients ingredients={ingredients} />
                                </div>
                                <div className={styles.column}>
                                    <BurgerConstructor ingredients={ingredients} />
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>

        </div>
    );
}

export default App;
