import React, { useMemo } from 'react';
import styles from './styles.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import SubmitOrder from '../submit-order/submit-order';
import { ingredients } from '../../utils/mock-data';
import { randomInt } from '../../helpers';

function App() {
    const buns = useMemo(() => {
        return ingredients.filter((item) => item.type === 'bun')
    }, [ingredients])

    const mains = useMemo(() => {
        return ingredients.filter((item) => item.type === 'main')
    }, [ingredients])

    const sauces = useMemo(() => {
        return ingredients.filter((item) => item.type === 'sauce')
    }, [ingredients])

    const applyIngredients = mains.slice(randomInt(1,mains.length - 1),randomInt(1,mains.length - 1)).concat(sauces.slice(randomInt(1,sauces.length - 1),randomInt(1,sauces.length - 1)))
    const applyBun = buns[randomInt(0,buns.length - 1)]

    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader />
            <main className={`${styles.container} container d-flex justify-between`}>
                <div className={`${styles.column} mr-10`}>
                    <BurgerIngredients mains={mains} buns={buns} sauces={sauces} />
                </div>
                <div className={styles.column}>
                    <BurgerConstructor applyIngredients={applyIngredients} applyBun={applyBun} />
                    <SubmitOrder applyIngredients={applyIngredients} applyBun={applyBun} />
                </div>
            </main>

        </div>
    );
}

export default App;
