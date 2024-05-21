import React from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import SubmitOrder from './components/submit-order/submit-order';

function App() {
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader />
            <main className={`${styles.container} container d-flex justify-between`}>
                <div className={`${styles.column} mr-10`}>
                    <BurgerConstructor />
                </div>
                <div className={styles.column}>
                    <BurgerIngredients />
                    <SubmitOrder />
                </div>
            </main>

        </div>
    );
}

export default App;
