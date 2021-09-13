import { Link } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { ROUTER } from "../../../../utils/router-util"
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
