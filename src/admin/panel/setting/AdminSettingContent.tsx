import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { LoadingBtn } from "../../../../components/Loading/LoadingBtn"
import { store } from "../../../../provider/storeProvider"
import { AdminChangePasswordRequest } from "../../../../services/admin"
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const AdminSettingContent = () => {

    const { adminUser } = store()
    const [form, setForm] = useState<any>({})
    const [errMessage, setErrMessage] = useState<String>(null)
    const [btnLoading, setbtnLoading] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)

    const handleChange = useCallback(({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }, [form])

    console.log(form);

    useEffect(() => {
        adminUser && setForm({ email: adminUser.email })
    }, [adminUser])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrMessage(null)
        setbtnLoading(true)
        console.log(form);

        try {
            const { data: { messages } } = await AdminChangePasswordRequest(form)
            setbtnLoading(false)
            toast.success(messages)

            delete form.password
            delete form.new_password

        } catch (err) {
            const { data: { messages } } = err.response
            setErrMessage(messages)
            setbtnLoading(false)
        }

    }

    return (
        <>
            <h1>Change password</h1>
            <div className="admin-form setting-form">
                <div className="admin-form__logo">
                    <img src="/img/logo.png" />
                </div>
                <form className="admin-form__content" onChange={handleChange} onSubmit={handleSubmit}>
                    <div className="admin-group">
                        <input name="email" placeholder="Email" value={adminUser && adminUser.email} readOnly />
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="admin-group">
                        <input type={passwordShow ? "text" : "password"} name="password" value={form && form.password} placeholder="Old password" />
                        <label htmlFor="password">Old Password:</label>
                        <span onClick={() => setPasswordShow(show => !show)} >{!passwordShow ? <BsEye /> : <BsEyeSlash />}</span>
                    </div>
                    <div className="admin-group">
                        <input type={passwordShow ? "text" : "password"} name="new_password" value={form && form.new_password} placeholder="New password" />
                        <label htmlFor="new_password">New Password:</label>
                        <span onClick={() => setPasswordShow(show => !show)} >{!passwordShow ? <BsEye /> : <BsEyeSlash />}</span>
                    </div>
                    {errMessage && <div className="form-error-messages">{errMessage}</div>}
                    <button type="submit" disabled={btnLoading} >
                        Change
                        {btnLoading && <LoadingBtn />}
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdminSettingContent