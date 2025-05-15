import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent, LegendComponent, ToolboxComponent, TooltipComponent, DataZoomComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart,BarChart, CustomChart } from 'echarts/charts';
import { DataPointService } from './WebSocket/data-point.service';
import { NgxsModule } from '@ngxs/store';
import { DatapointState } from './datapoint/datapoint.state';
import { NgxsWebSocketPluginModule } from '@ngxs/websocket-plugin';
import { LineChartDataStore } from './linechart1_NgXs/linechart1.state';
import { LinechartComponent } from './Echart/linechart/linechart.component';
import { Linechart1Component } from './Echart/linechart1/linechart1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarchartComponent } from './Echart/barchart/barchart.component';
import { CustomdataStore } from './CustomChart_NgXs/Custom.state';
import { DemoformComponent } from './form/demoform/demoform.component';
import { CommonModule } from '@angular/common';
import { DemolistComponent } from './list/demolist/demolist.component';
import { WellDataStore } from './demo_Form_&_List_Store/well.state';
import { AppRoutingModule } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormListComponent } from './form-list/form-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatSortHeader } from '@angular/material/sort';
import { MultichartComponent } from './Echart/multichart/multichart.component';
import { VisualMapComponent } from 'echarts/components';




echarts.use([GridComponent, TitleComponent, TooltipComponent,VisualMapComponent, LegendComponent, ToolboxComponent, CanvasRenderer, LineChart,BarChart,CustomChart, DataZoomComponent]);


@NgModule({
  declarations: [
    AppComponent,
    Linechart1Component,
    LinechartComponent,
    BarchartComponent,
    DemoformComponent,
    DemolistComponent,
    NavbarComponent,
    PageNotFoundComponent,
    
    FormListComponent,
    MultichartComponent
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterOutlet,
    NgxEchartsModule.forRoot({echarts}),
    HttpClientModule,
    NgxsModule.forRoot([DatapointState, LineChartDataStore,CustomdataStore,WellDataStore]),
    NgxsWebSocketPluginModule.forRoot({}),
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatSortModule,
    MatPaginator,
    MatSortHeader,
    
  ],
  providers: [DataPointService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { } 