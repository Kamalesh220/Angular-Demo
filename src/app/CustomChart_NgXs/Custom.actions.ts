import { customData } from "./Custom.state"

export class getCustomDataPoint{
 static readonly type = '[Custom] get custom data'
 
 constructor(public data : customData[]) { }
}

export class connectWebsocket{
    static readonly type = '[Custom] connect websocket'
   
    constructor(public url: string) {}
}

export class  disConnectWebsocket{
    static readonly type = '[Custom] disconnect websocket'
}