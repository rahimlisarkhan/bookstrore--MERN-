import { AiOutlineClose } from 'react-icons/ai'


type Props = {
    setClose: (close: null) => void;
    children: any
}

export const Modal = ({ children, setClose }: Props) => {

    return (
        <div className="modalComp">
            <div className="modalComp__overlay"
                onClick={() => setClose(null)}
            >
                <AiOutlineClose />
            </div>
            <div className="modalComp__content">
                {children}
            </div>
        </div>
    )
}