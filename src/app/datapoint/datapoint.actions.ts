import { demoChartData } from "../Echart/linechart/linechart.component";

export class SetWebsocketConnection{
    static readonly type = '[Datapoint] check connection';

    constructor(public url : string){}
}

export class GetDatapointAction {
    static readonly type = '[Datapoint] get Datapoint'; 
    constructor(public data : demoChartData[]){}
      
}

export class DisconnectWebScket {
    static readonly type = "[Datapoint] disconnect websocket";
    constructor(public url : string){}
}

export class filterDataByDate {
    static readonly type = "[Datapoint] filterdata by date";
    constructor(public _date : Date){}
}

