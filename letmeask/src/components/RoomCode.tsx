import copyImg from '../assets/images/copy.svg';


import "../styles/room-code.scss";

export function RoomCode(){
    return (
        <button className="copy-button">
            <div>
                <img src={copyImg}  alt="Copy room code" />
            </div>
            <span>Sala #1234567</span>
        </button>

    )

}