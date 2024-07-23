import React from 'react';
import styles from "../../components/app/styles.module.css";
import AppHeader from "../../components/app-header/app-header";
import FeedDetails from "../../components/feed-details/feed-details";

const FeedDetailsPage = () => {
    return (
        <div className={`${styles.app} d-flex flex-column`}>
            <AppHeader/>
            <main className={`${styles.container} container mt-20 d-flex justify-center`}>
                <FeedDetails/>
            </main>

        </div>
    )
}

export default FeedDetailsPage