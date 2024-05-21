import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

const AppHeader = () => {
    return (
        <header>
            <div className="container">
                <nav className={`${styles.navigation} d-flex justify-between pt-4 pb-4`}>
                    <div className={'d-flex justify-between'}>

                        <div className={'d-flex justify-between pl-5 pr-5 pt-4 pb-4 mr-2'}>
                            <div className="pr-2">
                                <BurgerIcon type="primary" />
                            </div>
                            <span className={`${styles.title} text text_type_main-default`}>Конструктор</span>
                        </div>

                        <div className={'d-flex justify-between pl-5 pr-5 pt-4 pb-4'}>
                            <div className="pr-2">
                                <ListIcon type="secondary" />
                            </div>
                            <span className={`${styles.title} text text_type_main-default text_color_inactive`}>Лента заказов</span>
                        </div>
                    </div>
                    <Logo />
                    <div className={'d-flex justify-between pl-5 pr-5 pt-4 pb-4'}>
                        <div className="pr-2">
                            <ProfileIcon type="secondary" />
                        </div>
                        <span
                            className={`${styles.title} text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                    </div>

                </nav>
            </div>
        </header>
    )
}

export default AppHeader
