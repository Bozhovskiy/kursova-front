export interface ITrain {
    id: string;
    carriages: ICarriage[];
    name: string;
    directions: string[];
}

export interface ICarriage {
    carriageNumber: any;
    id?: string;
    type: string;
    name: string;
}