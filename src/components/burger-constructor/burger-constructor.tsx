import React, { FC } from 'react';
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import { groupIngredients } from '../../utils/mock-data';

interface BurgerConstructorProps {
    className?: string
}
const { bun, main, sauce } = groupIngredients

const BurgerConstructor: FC<BurgerConstructorProps> = ({ className }) => {
    const [current, setCurrent] = React.useState('one')


    return (
        <section className={styles.wrapperBurgerConstructor}>
            <h2 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h2>
            <div className={'d-flex mb-10'}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.wrapperIngredients}>
                <h3 className={'text text_type_main-medium'}>Булки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {bun.map(i => {
                        return (
                            <li>
                                <IngredientCard ingredient={i} />
                            </li>
                        )
                    })}
                </ul>

                <h3 className={'text text_type_main-medium'}>Соусы</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {sauce.map(i => {
                        return (
                            <li>
                                <IngredientCard ingredient={i} />
                            </li>
                        )
                    })}

                </ul>


                <h3 className={'text text_type_main-medium'}>Начинки</h3>
                <ul className={`${styles.list} d-flex flex-wrap mb-10 mt-6 pl-4 pr-4`}>
                    {main.map(i => {
                        return (
                            <li>
                                <IngredientCard ingredient={i} />
                            </li>
                        )
                    })}

                </ul>
            </div>
        </section>
    );
};

export default BurgerConstructor;
