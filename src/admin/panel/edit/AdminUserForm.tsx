import { useCallback, useState } from "react"


const AdminUserForm = ({ user }) => {
    const [form, setForm] = useState({ ...user })

    const handleChange = useCallback(({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }, [form])


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {

        } catch (err) {
        }

    }
    return (
        <form className="user-form__content" onChange={handleChange} onSubmit={handleSubmit}>
            <div className="user-group">
                <input type="full_name" name="full_name" value={form.full_name} />
            </div>
            <div className="user-group">
                <input name="email" placeholder="email" value={form.email} />
            </div>
            {/* {errMessage && <div className="form-error-messages">{errMessage}</div>} */}
            <button type="submit">Change</button>
        </form>
    )
}

export default AdminUserForm