import { Action, Selector, State, StateContext } from "@ngxs/store";
import { connectWebsocket, disConnectWebsocket, getCustomDataPoint } from "./Custom.actions";

export interface customData {
  Id: number;
  Value: number;
}

export interface customDataModel {
  getCustomDataValue: customData[];
  websocket: WebSocket | null;
}

@State<customDataModel>({
  name: 'Custom',
  defaults: {
    getCustomDataValue: [],
    websocket: null,
  },
})
export class CustomdataStore {

  @Action(connectWebsocket)
  connectCustomWebsocket(ctx: StateContext<customDataModel>, { url }: connectWebsocket) {
    const webSocket = new WebSocket(url);
    ctx.patchState({ websocket: webSocket });

    webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    webSocket.onmessage = (res) => {
        const message = JSON.parse(res.data);
        ctx.dispatch(new getCustomDataPoint(message));
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  @Action(getCustomDataPoint)
  getCustomeData(ctx: StateContext<customDataModel>, actions: getCustomDataPoint) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      getCustomDataValue: actions.data
    });
  }

  @Action(disConnectWebsocket)
  disconnectCustomWebsocket(ctx: StateContext<customDataModel>) {
    const state = ctx.getState();
    if (state.websocket) {
      state.websocket.close();
    }

    ctx.patchState({ websocket: null });
  }

  @Selector([CustomdataStore])
  static getCustomDataPoint(state: customDataModel) {
    return state.getCustomDataValue;
  }
}