import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentTimeService {

  private webSocket : WebSocket | undefined;
  private recievedMessage = new Subject<any>();

  constructor() { }

  public checkConnetcion(getWebSocketUrl : string) : void {
    if(!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN)
    {
      this.webSocket = new WebSocket(getWebSocketUrl);

      this.webSocket.onopen = () =>
      {
        console.log("WebSocket connection established.");
      }

      this.webSocket.onmessage = (message) =>
      {
        try{
          const storeMessage = JSON.stringify(message.data);
        this.recievedMessage.next(storeMessage); 
        }
        catch(error)
        {
          console.log('Error parsing JSON:', error);
        }         
      }

      this.webSocket.onclose = () => {
        console.log("WebSocket connection closed");
      }

      this.webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      }

    }    
  }

  public getMessage()  : Observable<any>{
    return this.recievedMessage.asObservable();
  }

  public disconnect() : void {
    if (this.webSocket && (this.webSocket.readyState === WebSocket.OPEN || this.webSocket.readyState === WebSocket.CONNECTING)) {
      this.webSocket.close();
      this.webSocket = undefined;
    }
  }

}
