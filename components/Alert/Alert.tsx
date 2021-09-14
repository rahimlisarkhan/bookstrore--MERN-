import React from "react"

type Props = {
    id: number;
    title: string;
    setAlertClose: (close: null) => void;
    alertRequest: (id: number | string) => void;
}

export const Alert: React.FC<Props> = ({ title, id, setAlertClose, alertRequest }) => {
    return (
        <div className="alert-content">
            <div className="alert-content__title">
                {title}
            </div>
            <div className="alert-content__btn">
                <button onClick={() => { alertRequest(id), setAlertClose(null) }}>Yes</button>
                <button onClick={() => setAlertClose(null)}>No</button>
            </div>
        </div>
    )
}