import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import Link from '../link/link';

const AppHeader = () => {
    return (
        <header>
            <div className="container">
                <nav className={`${styles.navigation} d-flex justify-between pt-4 pb-4`}>
                    <div className={'d-flex justify-between'}>
                        <Link title={'Конструктор'} icon={<BurgerIcon type="primary" />} href={'/'} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                        <Link title={'Лента заказов'} icon={<ListIcon type="secondary" />} disabled={true} href={'/'} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                    </div>
                    <Logo />
                    <Link title={'Личный кабинет'} icon={<ProfileIcon type="secondary" />} disabled={true} href={'/'} classname={'pl-5 pr-5 pt-4 pb-4 mr-2'} />
                </nav>
            </div>
        </header>
    )
}

export default AppHeader
