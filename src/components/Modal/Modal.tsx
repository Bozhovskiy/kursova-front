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
                    <h3 style={{color:'#272727'}}>Додавання потягу</h3>
                    <Button btnStyle={{paddingLeft:20,paddingRight:20}} label="x" onClick={closeModal}/>
                </div>
                <input value={name} placeholder="ID потягу" onChange={(e) => setName(e.target.value)}/>
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
                        <Button onClick={() => removeDirection(index)} label="Видалити"/>
                    </div>
                ))}
                <Button onClick={() => {
                    if (directionsLength < 5) {
                        setDirectionsLength(directionsLength + 1)
                    } else {
                        toast.error('Максимальна кількість напрямків: 5', errorToasterStyles)
                    }
                }
                } label="Додати напрямок"/>
                <Button label="Додати потяг" secondary={true} onClick={async () => {
                    if (name.length > 0 && directions.every(function (elem) {
                        return elem.length >= 0;
                    }) && directions.length > 1) {
                        if(new Set(directions).size === directions.length){
                        const data = await postTrain(name, directions).then()
                        console.log(data)
                        if(data){
                            closeModal();
                            window.location.href = '/train/' + data.id;
                        }
                        }
                        else {
                            toast.error('Усі напрямки повинні бути унікальними.', errorToasterStyles)
                        }
                    } else {
                        toast.error('Заповніть усі поля.', errorToasterStyles)
                    }
                }
                }/>
            </div>
        </div>
    )
}
export default Modal;