import '../Modal/Modal.css';
import React, {useEffect, useState} from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";
import {getTrains, postReportAPI} from "../../api/api";
import {ITrain} from "../../constants/interfaces";

interface IModal {
    closeModal: () => void
}

const ModalReport: React.FC<IModal> = ({closeModal}) => {
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [trainValue,setTrainValue]=useState<string>();
    const [typeValue,setTypeValue]=useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrains().then();
            setTrains(data);
            if(data.length>0){
                setTrainValue(data[0].id)
                const typeArray = data[0].directions.map(() => data[0].carriages[0].type);
                setTypeValue(typeArray)
            }
        }
        fetchData().then( );
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTrainValue(event.target.value);
    }
    const handleType = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedArray = [...typeValue];
        updatedArray[index] = event.target.value;
        setTypeValue(updatedArray);
    }
    const postReport=()=>{
        const areAllTypesUnique = new Set(typeValue).size === typeValue.length;
        console.log(areAllTypesUnique)
        const currentTrain=trains.find(train => train.id === trainValue);
        if(areAllTypesUnique){
            const reportDetails=currentTrain?.directions.map(
                (direction, index) => (
                    {type:typeValue[index],direction }
                ))
            postReportAPI(currentTrain?.carriages[0]?.name, trainValue, reportDetails).then()
        }
        else{
            toast.error('Кожен напрямок повинен містити унікальний тип.',errorToasterStyles);
        }
    }
    return (
        <div className="modal">
            <div className="modal__mini">
                <div className="modal__title">
                    <h3 style={{color:'#272727'}}>Формування звіту</h3>
                    <Button btnStyle={{paddingLeft:20,paddingRight:20}} label="x" onClick={closeModal}/>
                </div>
                <h3 style={{color:'#272727'}}>ID потягу</h3>
                <select name="ID потягу"  value={trainValue} onChange={handleChange}>
                    {trains?.map((train,_)=><option value={train.id}>{train.name}</option>)}
                </select>
                {trains.length>0&&trains.find(train => train.id === trainValue)?.directions.map((direction, index) => (
                    <>
                        <h5 style={{color:'#272727'}}>Тип вагону для напрямку {direction}:</h5>
                        <select key={index} name="Тип вагону" value={typeValue[index]} onChange={(e)=>handleType(e,index)}>
                            {Array.from(new Set(trains.find(train => train.id === trainValue)?.carriages.map(carriage => carriage.type)))
                                .map((uniqueType, mapIndex) => (
                                    <option key={mapIndex} value={uniqueType}>{uniqueType}</option>
                                ))
                            }
                        </select>
                    </>
                ))}
                <Button label="Створити звіт" onClick={postReport}/>
            </div>
        </div>
    )
}
export default ModalReport;