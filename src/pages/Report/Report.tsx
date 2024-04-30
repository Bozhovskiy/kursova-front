import React, {useEffect, useState} from 'react';
import './Report.css';
import {getReports} from "../../api/api";
import {ICarriage} from "../../constants/interfaces";
import {TrainReportSVG} from "../../components";

interface IReportDetails {
    type: string
    direction: string
}

interface IReportsFull {
    report: IReports,
    carriages: ICarriage[];
    trainName: string;
}

interface IReports {
    executorName: string,
    reportTime: string
    trainId: string
    reportDetails: IReportDetails[]
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat('ua', options);
    return formatter.format(date).replace(/(\d+)\.(\d+)\.(\d+),/, '$1.$2.$3');
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
        <div className="report">
            <h4>Звіти:
                <div className="reports">
                    <h5 className="report__directions">ID</h5>
                    <h5 className="report__directions">Час звіту</h5>
                    <h5 className="report__directions">ПІБ виконавця</h5>
                    <h5 className="report__directions">Id потягу</h5>
                </div>
                {reports?.map((report, index) =>
                    <>
                        <div className="reports" key={index}>
                            <h5>{index + 1}</h5>
                            <h5>{report.report.executorName}</h5>
                            <h5>{formatDate(report.report.reportTime)}</h5>
                            <h5>{report.trainName}</h5>
                        </div>
                        <h5 style={{
                            display: "flex",
                            flexDirection: "row",
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border:"solid 1px #2C27E5",
                            borderTop:'none'
                        }}>
                            {report.report.reportDetails.map((detail, index) =>
                                <h5 key={index}
                                    style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                        width:'15vw',
                                    }}>
                                    <h5 style={{
                                        color: 'red',
                                        border: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        fontSize: 14,
                                    }}>
                                        <h5 style={{color: '#008000', fontSize: 16,textAlign:'center'}}>{detail.direction}</h5>
                                        <h5 style={{color: '#008000', fontSize: 16,textAlign:'center'}}>{detail.type}</h5>
                                        <TrainReportSVG type={detail.type}/>
                                        {report?.carriages.map((carriage, index) =>
                                            carriage.type === detail.type &&
                                            <h5 key={index} style={{border: 'none', fontSize: 16}}>{carriage.carriageNumber};</h5>)}
                                    </h5>
                                    <br/>
                                </h5>)}
                        </h5></>
                )}
            </h4>
        </div>
    );
}

export default Report;
