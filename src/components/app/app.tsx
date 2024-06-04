import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients';
import { AppDispatch, RootState } from '../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {ingredients} = useSelector((state: RootState) => state.ingredientsStore)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setLoading(true)

        dispatch(fetchIngredients()).catch(setError).finally(() =>{
            setLoading(false)
        })
    }, [dispatch]);

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader />
            <main className={`${styles.container} container d-flex justify-between`}>

                {loading && (<p>Загрузка ингредиентов...</p>)}
                {error && (<p>{error}</p>)}
                {!!ingredients.length && (
                    <DndProvider backend={HTML5Backend}>
                        <div className={`${styles.column} mr-10`}>
                            <BurgerIngredients ingredients={ingredients} />
                        </div>
                        <div className={styles.column}>
                            <BurgerConstructor ingredients={ingredients} />
                        </div>
                    </DndProvider>
                )}
            </main>

        </div>
    );
}

export default App;
