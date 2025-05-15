import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:'full'},
    {
        path: 'home',
        loadChildren: () => import('./chart-module/chart-module.module').then(m => m.ChartModuleModule),
        title:"Dashboard"
      },
      {
        path: 'wellForm',
        loadChildren: () => import('./well-detail-module/well-detail-module.module').then(m => m.WellDetailModuleModule),
        title : "Well Form"
      },
    {path:'**',title:"Page-Not-Found",component:PageNotFoundComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule{

}