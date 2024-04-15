import React, {useEffect, useState} from 'react';
import './Main.css';
import { getTrains} from "../../api/api";
import {ITrain} from "../../constants/interfaces";

function Main() {
    const [trains, setTrains] = useState<ITrain[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrains().then();
            setTrains(data);
        }
        fetchData().then( );
    }, []);

    return (
            <div className="App">
                <div className="trains__card">
                    {trains?.map((train, index) => <div className="train__card" key={index}
                                                        onClick={()=>window.location.href='/train/'+train.id}>
                        <h3>Потяг: {train.name}</h3>
                        <h4>Напрямки:{train.directions.map((direction, index) =>
                            <div key={index}>{direction}</div>)}</h4>
                    </div>)}
                </div>

        </div>
    );
}

export default Main;
