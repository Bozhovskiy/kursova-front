import axios from 'axios';
import toast from 'react-hot-toast';
import {errorToasterStyles, successToasterStyles} from "../constants/toaster";
const url ='http://localhost:8080/'
export const getTrains=async () => {
    try {
        const response = await axios.get(url + 'trains');
        if (response.status !== 200) {
            toast.error('No data');
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getTrainByID=async (id:string|undefined) => {
    try {
        const response = await axios.get(url + 'trains/'+id);
        if (response.status !== 200) {
            toast.error('No data');
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const postTrain=async (name:string,directions:string[]) => {
    try {
        const response = await axios.post(url + 'trains',{
            name,directions
        });
        if (response.status !== 200) {
            toast.error(response.data.message,errorToasterStyles);
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const deleteTrain=async (id:string) => {
    try {
        const response = await axios.delete(url + 'trains/'+id);
        if (response.status !== 200) {
            toast.error('Не вдалося видалити поїзд',errorToasterStyles);
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const deleteCarriage=async (carriageId:string|undefined,id:string) => {
    try {
        const response = await axios.delete(url +'carriage/'+carriageId);
        if (response.status !== 200) {
            toast.error('Не вдалося видалити поїзд',errorToasterStyles);
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const putCarriage=async (id: string | undefined, type:string,name:string,carriageNumber:number,owner:string) => {
    try {
        const response = await axios.post(url + 'trains/'+id+'/carriages',{
            type,name,carriageNumber,owner
        });
        if (response.status === 200) {
            toast.success('Додано вагон: '+name,successToasterStyles);
            window.location.reload();
        } else {
            toast.error(response.data.message,errorToasterStyles);
        }
        return response.data;
    } catch (error) {
        // @ts-ignore
        toast.error(error.response.data.message,errorToasterStyles);
    }
}