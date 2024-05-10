import React, {useEffect, useState} from 'react';
import './Train.css';
import {useParams} from "react-router-dom";
import {deleteTrain, getTrainByID, putCarriage} from "../../api/api";
import {ITrain} from "../../constants/interfaces";
import {Button, TrainSVG} from "../../components";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";

function Train() {

    const typesName = ["Пасажирський","Локомотив","Універсальний","Вагон-цистерна","Спеціалізований"];

    const {id} = useParams();
    const [train, setTrain] = useState<ITrain>();
    const fetchData = async () => {
        const data = await getTrainByID(id).then();
        if(data===undefined){
            window.location.href="/"
        }
        setTrain(data);
    }
    useEffect(() => {
        fetchData().then();
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(typesName[0]);
    const [name, setName] = useState('');
    const [owner,setOwner]=useState('');
    const [carriageNumber, setCarriageNumber] = useState(1);
    return (
        <div className="train">
            <h3 style={{display:"flex",flexDirection:'row',gap:8,marginTop:8}}>Інформація про потяг {train?.name}
                <Button label="Видалити потяг" btnStyle={{padding:4,borderColor:'#ea5a47'}} btnLabelStyle={{fontWeight:400,color:'#ea5a47',fontSize:16}} secondary={true} onClick={() => {
                    if(train){deleteTrain(train?.id).then()}}}/>
            </h3>
            <h4>Доступні напрямки:{train?.directions.map((direction, index) =>
                <h5 className="train__directions" key={index}>{direction}</h5>)}</h4>
            <div>
                {train?.carriages && train?.carriages?.length > 0 ?<></>:
                    <div><h3>Вагони відсутні</h3></div>}
                <div className="carriages_svg">
                {train?.carriages &&train?.carriages.length>0 &&train?.carriages?.map((carriage, index) => <div className="carriage" key={index}>
                    <TrainSVG trainId={train.id} carriageId={carriage.id} name={carriage.name} type={carriage.type} carriageNumber={carriage.carriageNumber}/>
                </div>)}
                </div>
            </div>
            {isOpen && <>
                Тип вагону:
                <select name="Тип вагону" value={type} onChange={(e)=>setType(e.target.value)}>
                    {typesName.map((uniqueType, mapIndex) => (
                            <option key={mapIndex} value={uniqueType}>{uniqueType}</option>
                        ))
                    }
                </select>
                Назва вагону:
                <input
                    placeholder={`Назва вагону:`}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                Номер вагону:
                <input
                    placeholder={`Номер вагону:`}
                    value={carriageNumber}
                    onChange={(e) => {
                        setCarriageNumber(Number(e.target.value))
                    }}
                />
                ПІБ водія вагону:
                <input
                    placeholder={`ПІБ:`}
                    value={owner}
                    onChange={(e) => {
                        setOwner(e.target.value)
                    }}
                />
                <Button label="Додати вагон" onClick={() => {
                    if(name.length>0&&type.length>0&&carriageNumber>0&&owner.length>0){
                       putCarriage(train?.id, type, name, carriageNumber,owner).then(() => fetchData().then())
                    }
                    else{
                        console.log(name,type,carriageNumber,owner)
                        toast.error('Заповніть усі поля',errorToasterStyles)
                    }
                }}
                />
                <Button label="Додати пізніше"  btnStyle={{marginBottom:50}} onClick={() => setIsOpen(false)}/>
            </>}
            {!isOpen && <Button label="Додати вагон" onClick={() => setIsOpen(true)}  btnStyle={{marginTop:50,marginBottom:50}}/>}
        </div>
    );
}

export default Train;
