import React from "react"

type Props = {
    user: {
        _id: string;
        full_name?: string;
        email?: string;
        gender?: boolean;
    }
    setClose: (id:any) => void
}

export const UserCard: React.FC<Props> = ({ setClose, user: { _id, full_name, gender, email } }) => {

    return (
        <div className="user-card" onClick={() => setClose(_id)}>
            <div className="user-card__image">
                <img src={`/img/${gender ? 'user-woman.png' : 'user-avatar.png'}`} />
            </div>
            <div className="user-card__title">
                {full_name}
            </div>
        </div>
    )
}