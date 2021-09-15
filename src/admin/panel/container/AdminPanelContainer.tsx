import AdminPanelHeader from "../header/AdminPanelHeader"
import AdminPanelNav from "../nav/AdminPanelNav"

const AdminPanelContainer = ({ children }) => {

    return (
        <div className="admin-panel-container">

            <AdminPanelNav />

            <div className="admin-router-content">
                <AdminPanelHeader />
                {children}
            </div>

        </div>
    )

}

export default AdminPanelContainer
