import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ByCapitalComponent } from './countries/pages/by-capital/by-capital.component';
import { ByRegionComponent } from './countries/pages/by-region/by-region.component';
import { ByCountryComponent } from './countries/pages/by-country/by-country.component';
import { ShowCountryComponent } from './countries/pages/show-country/show-country.component';


// app's routes
const routes: Routes = [
    // main route 
    {path:'', component:ByCountryComponent, pathMatch:'full'},
    // region route 
    {path:'region', component:ByRegionComponent, pathMatch:'full'},
    // capital route 
    {path:'capital', component:ByCapitalComponent, pathMatch:'full'},
    // country by id 
    {path:'country/:id', component:ShowCountryComponent, pathMatch:'full'},
    // exception to redirect to main route
    {path: '**', redirectTo:''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {}