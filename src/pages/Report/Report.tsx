import React, {useEffect, useState} from 'react';
import './Report.css';
import {getReports} from "../../api/api";
import {ICarriage} from "../../constants/interfaces";

interface IReportDetails {
    type:string
    direction:string
}
interface IReportsFull {
    report:IReports,
    carriages:ICarriage[];
}

interface IReports {
    executorName:string,
    reportTime:string
    trainId:string
    reportDetails:IReportDetails[]
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat('ua', options);
    return formatter.format(date);
}
function Report() {
    const [reports, setReports] = useState<IReportsFull[]>([]);
    const fetchData = async () => {
        const data = await getReports().then();
        setReports(data);
    }
    useEffect(() => {
        fetchData().then();
    }, []);
 return (
        <div className="train">
            <h4>Звіти:
                <div className="reports">
                    <h5 className="train__directions">ПІБ виконавця</h5>
                    <h5 className="train__directions">Час звіту</h5>
                    <h5 className="train__directions">Id поїзда</h5>
                    <h5  className="train__directions" style={{display:"flex",flexDirection:"row",width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <h5 style={{color:'red',border:'none'}}>Тип вагонів [вагони]</h5>-<h5 style={{color:'#008000',border:'none'}}>Пункти призначення</h5>
                    </h5>
                </div>
                {reports?.map((report, index) =>
                <div className="reports" key={index}>
                    <h5>{report.report.executorName}</h5>
                    <h5>{formatDate(report.report.reportTime)}</h5>
                    <h5>{report.report.trainId}</h5>
                    <h5 style={{display:"flex",flexDirection:"column",width:'100%',alignItems:'center',justifyContent:'center'}}>
                        {report.report.reportDetails.map((detail,index)=>
                            <h5 style={{display:"flex",flexDirection:"row",width:'100%',alignItems:'center',justifyContent:'center',border:'none'}}>
                                <h5 style={{color:'red',border:'none',display:'flex',flexDirection:'row'}}>{detail.type}[{report.carriages.map((carriage,index)=>
                                    carriage.type===detail.type&&<h5 style={{border:'none'}}>{carriage.carriageNumber};</h5>)}]</h5>-<h5 style={{color:'#008000',border:'none'}}>{detail.direction}</h5><br/>
                        </h5>)}
                    </h5>
                </div>
            )}
            </h4>
        </div>
    );
}

export default Report;
