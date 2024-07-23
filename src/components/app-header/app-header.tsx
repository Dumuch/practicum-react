import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import Link from '../link/link';
import {routes} from "../../pages";
import {useAppSelector} from "../../services";

const AppHeader = () => {
    const user = useAppSelector((state) => state.userStore.user)

    return (
        <header>
            <div className="container">
                <nav className={`${styles.navigation} d-flex justify-between pt-4 pb-4`}>
                    <div className={'d-flex justify-between'}>
                        <Link title={'Конструктор'} Icon={BurgerIcon} href={'/'}
                              classname={'pl-5 pr-5 pt-4 pb-4 mr-2'}/>
                        <Link title={'Лента заказов'} Icon={ListIcon} href={routes.feed}
                              classname={'pl-5 pr-5 pt-4 pb-4 mr-2'}/>
                    </div>
                    <Logo/>
                    {user ? (
                        <Link title={'Личный кабинет'} Icon={ProfileIcon} href={routes.profile.main}
                              classname={'pl-5 pr-5 pt-4 pb-4 mr-2'}/>
                    ) : (
                        <Link title={'Войти'} Icon={ProfileIcon} href={routes.login}
                              classname={'pl-5 pr-5 pt-4 pb-4 mr-2'}/>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default AppHeader
