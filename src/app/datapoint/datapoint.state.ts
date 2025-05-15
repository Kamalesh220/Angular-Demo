import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { demoChartData } from '../Echart/linechart/linechart.component';
import { DataPointService } from '../WebSocket/data-point.service';
import { DisconnectWebScket, GetDatapointAction, SetWebsocketConnection } from './datapoint.actions';

export interface DatapointStateModel {
    getDataPoint: demoChartData[];
    hasReceivedData: boolean; 
}

@State<DatapointStateModel>({
    name: 'DataPoint',
    defaults: {
        getDataPoint: [],
        hasReceivedData: false
        
    }
})
@Injectable()
export class DatapointState {

    constructor(private datapointService : DataPointService){}
    
    @Action(SetWebsocketConnection)
  connectWebSocket(ctx: StateContext<DatapointStateModel>, { url }: SetWebsocketConnection) {
    const websocket = new WebSocket(url);
    
    websocket.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      ctx.dispatch(new GetDatapointAction(message));
    };

    websocket.onclose = () => {
        console.log("WebSocket connection closed")
    }
  }

    @Action(GetDatapointAction)
    getDataPoints(ctx: StateContext<DatapointStateModel>, actions: GetDatapointAction) {
    const state = ctx.getState();
    let updatedDataPoint: demoChartData[];

    if (!state.hasReceivedData) {
        updatedDataPoint = [...actions.data];
        ctx.setState({
            ...state,
            getDataPoint: updatedDataPoint,
            hasReceivedData: true,
        });
    } else {
        const lastFive = actions.data.slice(-5);
        let previousData = [...state.getDataPoint];
        updatedDataPoint = [...previousData,...lastFive];

        ctx.setState({
            ...state,
            getDataPoint: updatedDataPoint,
        });
    }
    console.log("dddd", updatedDataPoint);
}

    @Action(DisconnectWebScket)
    disconnectWebsocket(ctx:StateContext<DatapointStateModel>, {url} : DisconnectWebScket){
        const websocket = new WebSocket(url);
        if(websocket)
        {
            websocket.close();
        }
        else {
            console.log("No WebSocket connection to close");
        }
        const state  = ctx.getState();
        ctx.setState({
            ...state
        })
    }

    @Selector([DatapointState])
    static getState(state: DatapointStateModel) {
        return state.getDataPoint;
    }

}
