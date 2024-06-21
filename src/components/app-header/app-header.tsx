import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import Link from '../link/link';
import {routes} from "../../pages";
import { useSelector } from 'react-redux';
import {RootState} from "../../services";

const AppHeader = () => {
    const { user } = useSelector((state: RootState) => state.userStore)

    return (
        <header>
            <div className="container">
                <nav className={`${styles.navigation} d-flex justify-between pt-4 pb-4`}>
                    <div className={'d-flex justify-between'}>
                        <Link title={'Конструктор'} icon={<BurgerIcon type="primary" />} href={'/'} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                        <Link title={'Лента заказов'} icon={<ListIcon type="secondary" />}  href={'/'} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                    </div>
                    <Logo />
                    {user ? (
                        <Link title={'Личный кабинет'} icon={<ProfileIcon type="secondary" />}  href={routes.profile.main} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                    ):(
                        <Link title={'Войти'} icon={<ProfileIcon type="secondary" />}  href={routes.login} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                    )}
                </nav>
            </div>
        </header>
    )
}

export default AppHeader
