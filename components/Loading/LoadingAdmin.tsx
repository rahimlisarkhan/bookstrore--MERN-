import React from "react"


type Props = {
    opacity?: boolean
}

export const LoadingAdmin: React.FC<Props> = ({ opacity = false }) => {
    return (
        <div className={`loading-admin-content ${opacity && "loading-opacity"}`}>
            <div className="loadingio-spinner-pulse-f5x2njhzpfq">
                <div className="ldio-t7tqugy2btb">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

