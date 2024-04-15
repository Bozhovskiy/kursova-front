import './Modal.css';
import React, {useState} from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";
import {postTrain} from "../../api/api";

interface IModal {
    closeModal: () => void
}

const Modal: React.FC<IModal> = ({closeModal}) => {


    const [name, setName] = useState('');
    const [directions, setDirections] = useState<string[]>([]);
    const [directionsLength, setDirectionsLength] = useState<number>(2);
    const removeDirection = (index: number) => {
        if (directionsLength > 2) {
            setDirectionsLength(directionsLength - 1)
            setDirections(prevDirections => prevDirections.filter((_, i) => i !== index));
        } else {
            toast.error('Мінімальна кількість напрямків: 5', errorToasterStyles)
        }
    }

    return (
        <div className="modal">
            <div className="modal__mini">
                <div className="modal__title">
                    <h2>Добавлення потягу</h2>
                    <Button label="x" onClick={closeModal}/>
                </div>
                <input value={name} placeholder="Назва потягу" onChange={(e) => setName(e.target.value)}/>
                {new Array(directionsLength).fill('').map((_, index) => (<div className="app_inputs">
                        <input
                            placeholder={`Напрямок №${index + 1}`}
                            key={index}
                            value={directions[index] || ''}
                            onChange={(e) => {
                                const newDirections = [...directions];
                                newDirections[index] = e.target.value;
                                setDirections(newDirections);
                            }}
                        />
                        <Button onClick={() => removeDirection(index)} label="Видалити напрямок"/>
                    </div>
                ))}
                <Button onClick={() => {
                    if (directionsLength < 5) {
                        setDirectionsLength(directionsLength + 1)
                    } else {
                        toast.error('Максимальна кількість напрямків: 5', errorToasterStyles)
                    }
                }
                } label="Добавити напрямок"/>
                <Button label="Добавити потяг" secondary={true} onClick={async () => {
                    if (name.length > 0 && directions.every(function (elem) {
                        return elem.length >= 0;
                    }) && directions.length > 1) {
                        const data = await postTrain(name, directions).then()
                        closeModal();
                        window.location.href = '/train/' + data.id;
                    } else {
                        toast.error('Заповність усі поля', errorToasterStyles)
                    }
                }
                }/>
            </div>
        </div>
    )
}
export default Modal;