import React from 'react';
import styles from "../components/app/styles.module.css";
import AppHeader from "../components/app-header/app-header";

const NotFound = () => {
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container d-flex justify-center`}>
                <div className="mt-a mb-a">
                    <p className={'text text_type_main-medium text-align-center'}>Страница не найдена</p>
                </div>
            </main>

        </div>
    );
};

export default NotFound;