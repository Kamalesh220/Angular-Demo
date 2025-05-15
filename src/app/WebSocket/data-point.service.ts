import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetDatapointAction } from '../datapoint/datapoint.actions';

@Injectable({
  providedIn: 'root',
})
export class DataPointService {
  // private webSocket: WebSocketSubject<any> | undefined;
  // private receivedMessage = new Subject<any>();

  // constructor(private store: Store) {}

  // checkConnetcion(url: string) {
  //   this.webSocket = new WebSocketSubject(url);

  //   this.webSocket.subscribe({
  //     next: (message) => {
  //       console.log("check datapoint", message);
  //       let date = "";
  //       let value =0;
  //       this.receivedMessage.next(message); 
  //       this.store.dispatch(new GetDatapointAction()); 
  //     },
  //     error: (err) => {
  //       console.error('WebSocket error: ', err);
  //     },
  //     complete: () => {
  //       console.log('WebSocket connection closed');
  //     },
  //   });
  // }

  // getMessage(): Observable<any> {
  //   return this.receivedMessage.asObservable();
  // }

  // disconnect(): void {
  //   if (this.webSocket) {
  //     this.webSocket.complete();
  //     this.webSocket = undefined;
  //   }
  // }
}