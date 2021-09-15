import { useState } from "react"
import AdminPanelTabPanel from "./AdminEditTabPanel"
import AdminProductTab from "./AdminProductTab"
import AdminUserTab from "./AdminUsersTab"


const AdminEditContent = ({ users, products }) => {

    const [tabIndex, setTabIndex] = useState(1)

    const TabPage = () => {
        let content: any = null
        switch (tabIndex) {
            case 1:
                content = <AdminUserTab users={users} />
                break;
            case 2:
                content = <AdminProductTab products={products} />
                break;
            default:
                content = <AdminUserTab users={users} />
                break;
        }
        return content
    }

    return (
        <>
            <h1>Admin Edit content</h1>
            <AdminPanelTabPanel tabIndex={tabIndex} setTabIndex={setTabIndex} />
            {TabPage()}
        </>
    )
}

export default AdminEditContent