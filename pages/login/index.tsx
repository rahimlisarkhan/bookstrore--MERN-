
import { useEffect, useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/client'

const HomePage = () => {

    const [errMessage, setErrorMessage] = useState<any>(false)
    const inputRef = useRef<any | null>()
    const passwordRef = useRef<any | null>()

    const handleSubmitRegister = async () => {
        setErrorMessage(false)

        const result = await signIn('credentials', {
            redirect: false,
            email:  inputRef.current.value,
            password: passwordRef.current.value,
        })

        console.log(result);

        setErrorMessage(result.error)
    }





    return (
        <div className="register">
            <h1>Welcome.. 👋</h1>
            <input type='email' ref={inputRef} placeholder="Email" />
            <input type='password' ref={passwordRef} placeholder="Password" />

            <button onClick={() => {
                handleSubmitRegister()
            }}>
                send</button>
            {errMessage && <p className="errorMes">{errMessage}</p>}

        </div>

    )
}

export default HomePage
