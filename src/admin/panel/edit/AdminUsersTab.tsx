import { Admin } from "mongodb";
import { useState } from "react";
import { UserCard } from "../../../../components/Card/UserCard"
import { Modal } from "../../../../components/Modal/Modal";
import { store } from "../../../../provider/storeProvider";
import AdminUserForm from "./AdminUserForm";


const AdminUserTab = ({ users: { users } }) => {
    const { adminUser } = store()
    const [close, setClose] = useState(false)
    console.log(adminUser);
    return (
        <>
            <h1>User list</h1>
            <div className="user-list">
                {adminUser && users.filter((user: any) => user._id !== adminUser._id)
                    .map(user => (
                        <>
                            <UserCard setClose={setClose} key={user._id} user={user} />
                            {close === user._id && <Modal setClose={setClose}>
                                <AdminUserForm user={user} />
                            </Modal>}
                        </>
                    )

                    )}
            </div>
        </>
    )
}
export default AdminUserTab