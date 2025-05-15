import { ApplicationConfig, EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatapointState } from './datapoint/datapoint.state';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import { LineChartDataStore } from './linechart1_NgXs/linechart1.state';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),
              provideStore([DatapointState, LineChartDataStore], withNgxsWebSocketPlugin({}))
    ]
};








