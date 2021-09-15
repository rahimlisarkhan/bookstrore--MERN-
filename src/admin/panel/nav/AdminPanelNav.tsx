import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BiHomeSmile } from 'react-icons/bi'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiSettings3Line, RiEditBoxLine, RiShoppingBag3Line } from 'react-icons/ri'
import { store } from '../../../../provider/storeProvider'
import { ROUTER } from '../../../../utils/router-util'

const AdminPanelNav = () => {

    const { adminLogout } = store()
    const { asPath, push } = useRouter()

    const activeNav = useCallback((navRoute: string) => asPath === navRoute ? 'adminActivelist' : '', [asPath])

    return (
        <div className="admin-panel-nav">
            <nav>
                <div className="admin-panel-nav__logo">
                    <img src="/img/logo.png" alt='book store logo' />
                </div>
                <ul className="admin-panel-nav__list">
                    <li onClick={() => push(ROUTER.ADMIN.PANEL.MAIN.href)} className={activeNav(ROUTER.ADMIN.PANEL.MAIN.href)}><BiHomeSmile /></li>
                    <li onClick={() => push(ROUTER.ADMIN.PANEL.ORDERS.href)} className={activeNav(ROUTER.ADMIN.PANEL.ORDERS.href)}><RiShoppingBag3Line /></li>
                    <li onClick={() => push(ROUTER.ADMIN.PANEL.EDIT.href)} className={activeNav(ROUTER.ADMIN.PANEL.EDIT.href)}><RiEditBoxLine /></li>
                    <li onClick={() => push(ROUTER.ADMIN.PANEL.SETTING.href)} className={activeNav(ROUTER.ADMIN.PANEL.SETTING.href)}><RiSettings3Line /></li>
                </ul>
            </nav>

            <button onClick={adminLogout}><IoLogOutOutline /></button>
        </div>
    )
}

export default AdminPanelNav