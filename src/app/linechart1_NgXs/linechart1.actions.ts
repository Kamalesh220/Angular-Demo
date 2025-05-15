import { TiimeSeries } from "../Models/LineChartDataModel";
import { sendWSRequest } from "../Models/sendRequestToWSModel";

export class ConnectWebsocket{
    static readonly type = '[LineChart] connect websocket'

    constructor(public Url  : string, public sendRequeststartDate : string,public sendRequestendDate : string) {  }
}

export class GetLineChartData {
    static readonly type = '[LineChart] get linechart data'; 
    constructor(public Data : TiimeSeries[]){}
      
}

export class DisconnectWebScket {
    static readonly type = "[LineChart] disconnect websocket";
}