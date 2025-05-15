import { NgModule } from '@angular/core';
import { Linechart1Component } from '../Echart/linechart1/linechart1.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: Linechart1Component }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class ChartModuleModule { }
