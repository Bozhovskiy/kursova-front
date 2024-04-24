import React, {useEffect, useState} from 'react';
import './Train.css';
import {useParams} from "react-router-dom";
import {deleteCarriage, deleteTrain, getTrainByID, postTrain, putCarriage} from "../../api/api";
import {ITrain} from "../../constants/interfaces";
import {Button} from "../../components";
import toast from "react-hot-toast";
import {errorToasterStyles} from "../../constants/toaster";
interface ItrainSVG {
    color:string,
    secondColor:string
    carriageNumber:string
    type:string
    name:String,
    trainId:string,
    carriageId:string|undefined,
}
const TrainSVG: React.FC<ItrainSVG> =({color,secondColor,carriageNumber,name,type,carriageId,trainId})=> {
    return(
        <div style={{width: 400, height: 300, position: 'relative'}}>
            <div className="train__name">{carriageNumber}</div>
            <div className="train__number">#{carriageNumber}</div>
            <div className="train__type">{type}</div>
            <Button label="Видалити вагон" btnStyle={{padding:4,borderColor:'#ea5a47',position:'absolute',bottom:4,right:130}} btnLabelStyle={{fontWeight:400,color:'#ea5a47',fontSize:16}} secondary={true}
                    onClick={() => { deleteCarriage(carriageId, trainId).then();
                        window.location.reload();
                    }
                    }
            />
            <svg style={{marginTop: -50}} xmlns="http://www.w3.org/2000/svg" width="400px" height="400px"
                 viewBox="0 0 72 72" id="emoji">
                <g id="color">
                    <path fill="#3f3f3f" stroke="none"
                          d="M11.0288,51.4687h-2.195c-0.5725,0-1.0366-0.3616-1.0366-0.8078v-3.29 c0-0.4461,0.4641-0.8078,1.0366-0.8078h55.3491c0.5725,0,1.0366,0.3617,1.0366,0.8078v3.29c0,0.4462-0.4641,0.8079-1.0366,0.8079 l-0.8658-0.0001"/>
                    <path fill={secondColor} stroke="none"
                          d="M65.2195,33.1724H7.7972V22.2509c0-1.0281,0.8334-1.8616,1.8616-1.8616h53.6991 c1.0282,0,1.8616,0.8335,1.8616,1.8616V33.1724z"/>
                    <path fill={color} stroke="none"
                          d="M7.7972,30.915h57.4223v13.5884c0,1.1376-0.9221,2.0597-2.0597,2.0597H9.8568 c-1.1375,0-2.0596-0.9221-2.0596-2.0597V30.915z"/>
                    <path fill="#3f3f3f" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2" d="M11.0288,50.7107"/>
                    <path fill="#3f3f3f" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2" d="M48.7985,50.7107"/>
                    <path fill="#92d3f5" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M14.9881,40.1697H7.8313V26.5303h7.1568c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662 C16.0247,39.7056,15.5606,40.1697,14.9881,40.1697z"/>
                    <path fill="#92d3f5" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M31.375,40.1697h-6.1202c-0.5725,0-1.0366-0.4641-1.0366-1.0366V27.5669c0-0.5725,0.4641-1.0366,1.0366-1.0366h6.1202 c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662C32.4116,39.7056,31.9475,40.1697,31.375,40.1697z"/>
                    <path fill="#92d3f5" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M65.1854,40.1697h-7.1568c-0.5725,0-1.0367-0.4641-1.0367-1.0366V27.5669c0-0.5725,0.4642-1.0366,1.0367-1.0366h7.1568V40.1697z"/>
                    <path fill="#92d3f5" stroke="none" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M47.7619,40.1697h-6.1202c-0.5725,0-1.0366-0.4641-1.0366-1.0366V27.5669c0-0.5725,0.4641-1.0366,1.0366-1.0366h6.1202 c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662C48.7985,39.7056,48.3344,40.1697,47.7619,40.1697z"/>
                    <line x1="46.7985" x2="26.2182" y1="50.4706" y2="50.4706" fill="#3f3f3f" stroke="none"
                          strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <circle cx="18.0818" cy="51.5632" r="5.0001" fill="#d0cfce" stroke="none" strokeLinecap="round"
                            strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <circle cx="55.6092" cy="51.5632" r="5.0001" fill="#d0cfce" stroke="none" strokeLinecap="round"
                            strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                </g>
                <g id="line">
                    <path fill="#000000" stroke="none"
                          d="M5.6329,46.5631L5.6329,46.5631c0-0.5794,0.4698-1.0492,1.0492-1.0492h4.1967 c0.5795,0,1.0492,0.4698,1.0492,1.0492l0,0c0,0.5795-0.4697,1.0492-1.0492,1.0492H6.6821 C6.1027,47.6123,5.6329,47.1426,5.6329,46.5631z"/>
                    <path fill="#000000" stroke="none"
                          d="M61.072,46.5631L61.072,46.5631c0-0.5794,0.4697-1.0492,1.0492-1.0492h4.1967 c0.5794,0,1.0492,0.4698,1.0492,1.0492l0,0c0,0.5795-0.4698,1.0492-1.0492,1.0492h-4.1967 C61.5417,47.6123,61.072,47.1426,61.072,46.5631z"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2.0875"
                          d="M65.2195,46.5631H7.7972v-23.51c0-1.4712,1.1926-2.6638,2.6638-2.6638h52.0947c1.4712,0,2.6638,1.1926,2.6638,2.6638V46.5631z"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2" d="M11.0288,50.7107"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2" d="M48.7985,50.7107"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.6234"
                          d="M10.0288,50.7107h-1.195c-0.5725,0-1.0366-0.3058-1.0366-0.683v-2.7816c0-0.3772,0.4641-0.683,1.0366-0.683h55.3491 c0.5725,0,1.0366,0.3058,1.0366,0.683v2.7816c0,0.3772-0.4641,0.683-1.0366,0.683h-0.8658"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M14.9881,40.1697H7.8313V26.5303h7.1568c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662 C16.0247,39.7056,15.5606,40.1697,14.9881,40.1697z"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M31.375,40.1697h-6.1202c-0.5725,0-1.0366-0.4641-1.0366-1.0366V27.5669c0-0.5725,0.4641-1.0366,1.0366-1.0366h6.1202 c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662C32.4116,39.7056,31.9475,40.1697,31.375,40.1697z"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M65.1854,40.1697h-7.1568c-0.5725,0-1.0367-0.4641-1.0367-1.0366V27.5669c0-0.5725,0.4642-1.0366,1.0367-1.0366h7.1568V40.1697z"/>
                    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M47.7619,40.1697h-6.1202c-0.5725,0-1.0366-0.4641-1.0366-1.0366V27.5669c0-0.5725,0.4641-1.0366,1.0366-1.0366h6.1202 c0.5725,0,1.0366,0.4641,1.0366,1.0366v11.5662C48.7985,39.7056,48.3344,40.1697,47.7619,40.1697z"/>
                    <line x1="46.7985" x2="26.2182" y1="50.4706" y2="50.4706" fill="none" stroke="#000000"
                          strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <circle cx="18.0818" cy="51.5632" r="5.0001" fill="none" stroke="#000000" strokeLinecap="round"
                            strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <circle cx="55.6092" cy="51.5632" r="5.0001" fill="none" stroke="#000000" strokeLinecap="round"
                            strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                </g>
            </svg>
            </div>
    )
}

function Train() {
    const types = [
        {color: '#ea5a47', secondColor:'#ffffff'},
        {color:'#0000ff',secondColor:'#ffffff'},
        {color:'#ffffff',secondColor:'#ea5a47'},
        {color:'#ffff00',secondColor:'#ffffff'},
        {color:'#0000ff',secondColor:'#ffff00'}]
    const {id} = useParams();
    const [train, setTrain] = useState<ITrain>();
    const [typesDiff,setTypesDiff]=useState<string[]>([]);
    const fetchData = async () => {
        const data = await getTrainByID(id).then();
        if(data===undefined){
            window.location.href="/"
        }
        setTrain(data);
        const uniqueTypes = Array.from(new Set<string>(data.carriages.map((carriage: { type: string; }) => carriage.type)));
        setTypesDiff([...uniqueTypes]);
    }
    useEffect(() => {
        fetchData().then();
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [owner,setOwner]=useState('');
    const [carriageNumber, setCarriageNumber] = useState(1);
    return (
        <div className="train">
            <h3 style={{display:"flex",flexDirection:'row',gap:8,marginTop:8}}>Інформація про потяг:{train?.id}
                <Button label="Видалити потяг" btnStyle={{padding:4,borderColor:'#ea5a47'}} btnLabelStyle={{fontWeight:400,color:'#ea5a47',fontSize:16}} secondary={true} onClick={() => {
                    if(train){deleteTrain(train?.id).then()}}}/>
            </h3>
            <h3 style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>Назва потягу:{train?.name}</h3>
            <h4>Доступні напрямки:{train?.directions.map((direction, index) =>
                <h5 className="train__directions" key={index}>{direction}</h5>)}</h4>
            <div>
                {train?.carriages && train?.carriages?.length > 0 ?
                    <div className="carriage"><h3>Назва вагону</h3><h3>Тип вагону</h3></div> :
                    <div><h3>Вагони відсутні</h3></div>}
                {train?.carriages &&train?.carriages.length>0 &&train?.carriages?.map((carriage, index) => <div className="carriage" key={index}>
                    <TrainSVG trainId={train.id} carriageId={carriage.id} name={carriage.name} type={carriage.type} carriageNumber={carriage.carriageNumber} color={types[typesDiff.indexOf(carriage.type)].color} secondColor={types[typesDiff.indexOf(carriage.type)].secondColor}/>
                </div>)}
            </div>
            {isOpen && <>
                Тип вагону:
                <input
                    placeholder={`Тип вагону:`}
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value)
                    }}
                />
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
                    placeholder={`Тип вагону:`}
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
                <Button label="Добавити вагон" onClick={() => {
                    if(name.length>0&&type.length>0&&carriageNumber>0&&owner.length>0){
                       putCarriage(train?.id, type, name, carriageNumber,owner).then(() => fetchData().then())
                    }
                    else{
                        toast.error('Заповність усі поля',errorToasterStyles)
                    }
                }}
                />
                <Button label="Добавити пізніше"  btnStyle={{marginBottom:50}} onClick={() => setIsOpen(false)}/>
            </>}
            {!isOpen && <Button label="Добавити вагон" onClick={() => setIsOpen(true)}  btnStyle={{marginTop:50,marginBottom:50}}/>}
        </div>
    );
}

export default Train;
