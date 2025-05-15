import { Action, Selector, State, StateContext } from "@ngxs/store";
import { TiimeSeries } from "../Models/LineChartDataModel";
import { Injectable } from "@angular/core";
import { ConnectWebsocket, DisconnectWebScket, GetLineChartData } from "./linechart1.actions";
import { sendWSRequest } from "../Models/sendRequestToWSModel";
import { webSocket } from "rxjs/webSocket";
import { time } from "echarts";

export interface LineChartStateModel{
    getLineChartDataPoint : TiimeSeries[],
    websocket : WebSocket | null,
}

@State<LineChartStateModel>({
    name : 'LineChart',
    defaults : {
        getLineChartDataPoint: [],
        websocket: null,
    }
})

@Injectable({
    providedIn: 'root',
})

export class LineChartDataStore {

    formatDate(dateInput : string) : string {
        const date = new Date(dateInput); 
            const year = date.getFullYear(); 
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0'); 
        
            return `${year}-${month}-${day}`; 
    }

    formatTime(timeInput : string) : string {
            const time = new Date(timeInput); 
            const hour = time.getHours().toString().padStart(2,'0'); 
            const minute = time.getMinutes().toString().padStart(2, '0'); 
            const second = time.getSeconds().toString().padStart(2, '0'); 
        
            return `${hour}:${minute}:${second}`; 
    }

    @Action(ConnectWebsocket)
    connectWebSocketDB(ctx: StateContext<LineChartStateModel>, { Url, sendRequeststartDate, sendRequestendDate }: ConnectWebsocket) {
        const webSocket = new WebSocket(Url);
        ctx.dispatch({
            webSocket : webSocket,
        })
    
        const inputstartDate = sendRequeststartDate; 
        const formattedstartDate = this.formatDate(inputstartDate); 
        const formattedstartTime = this.formatTime(inputstartDate); 

        const inputendDate = sendRequestendDate; 
        const formattedendDate = this.formatDate(inputendDate); 
        const formattedEndTime = this.formatTime(inputendDate); 
    
        const request: sendWSRequest = {
            Type: "getDataForDate",
            StartDate: formattedstartDate,
            EndDate: formattedendDate,
            StartTime: formattedstartTime,
            EndTime: formattedEndTime
        };
        
        webSocket.onopen = () => {
            console.log('WebSocket connection established');
            webSocket.send(JSON.stringify(request));
        };
    
        webSocket.onmessage = (res) => {
            const message = JSON.parse(res.data);
            ctx.dispatch(new GetLineChartData(message));
        };
    
        webSocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        webSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    @Action(GetLineChartData)
    getDataPoints(ctx: StateContext<LineChartStateModel>, actions: GetLineChartData) {
        const state = ctx.getState();
        let updatedDataPoint: TiimeSeries[];
            updatedDataPoint = actions.Data;
            ctx.setState({
                ...state,
                getLineChartDataPoint : updatedDataPoint
            });
        } 
    
    @Action(DisconnectWebScket)
        disconnectWebsocket(ctx:StateContext<LineChartStateModel>){
            const state = ctx.getState();
        if(state.websocket)
        {
            state.websocket.close();
        }
        ctx.patchState({websocket : null});
        }

    @Selector([LineChartDataStore])
    static getLinechartData(state : LineChartStateModel)
    {
        return state.getLineChartDataPoint
    }
}