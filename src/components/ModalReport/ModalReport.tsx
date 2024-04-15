import '../Modal/Modal.css';
import React, {useEffect, useState} from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";
import {getTrains} from "../../api/api";
import {ITrain} from "../../constants/interfaces";

interface IModal {
    closeModal: () => void
}

const ModalReport: React.FC<IModal> = ({closeModal}) => {
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [trainValue,setTrainValue]=useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrains().then();
            setTrains(data);
        }
        fetchData().then( );
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTrainValue(event.target.value);
    }
    return (
        <div className="modal">
            <div className="modal__mini">
                <div className="modal__title">
                    <h2>Формування звіту</h2>
                    <Button label="x" onClick={closeModal}/>
                </div>
                <h3 style={{color:'#272727'}}>Назва потягу</h3>
                <select name="Назва потягу"  value={trainValue} onChange={handleChange}>
                    {trains?.map((train,index)=><option value={train.id}>{train.name}</option>)}
                </select>
                <div className="choose">
                    <h3>Напрямки</h3>
                    <h3>Типи вагонів</h3>
                </div>
                {trains.find(train => train.id === trainValue)?.carriages.map((carriage,map)=>{

                })}
            </div>
        </div>
    )
}
export default ModalReport;