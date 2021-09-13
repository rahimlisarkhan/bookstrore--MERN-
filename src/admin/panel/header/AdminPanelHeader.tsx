import { useRouter } from "next/router"
import { useCallback } from "react"
import { store } from "../../../../provider/storeProvider"
import { ROUTER } from "../../../../utils/router-util"

const AdminPanelHeader = () => {
    const { adminUser } = store()
    const { asPath} = useRouter()

    const pathTitle = useCallback(() => {
        switch (asPath) {
            case ROUTER.ADMIN.PANEL.MAIN.href:
                return ROUTER.ADMIN.PANEL.MAIN.title

            case ROUTER.ADMIN.PANEL.ORDERS.href:
                return ROUTER.ADMIN.PANEL.ORDERS.title

            case ROUTER.ADMIN.PANEL.EDIT.href:
                return ROUTER.ADMIN.PANEL.EDIT.title

            case ROUTER.ADMIN.PANEL.SETTING.href:
                return ROUTER.ADMIN.PANEL.SETTING.title
        }
    }, [])

    return (
        <header className="admin-panel-header">
            <div className="admin-panel-header__route">
                {pathTitle()}
            </div>
            <div className="admin-panel-header__user">
                <span>{adminUser && adminUser.full_name.slice(0,2).toUpperCase()}</span>
            </div>
        </header>
    )
}
export default AdminPanelHeader