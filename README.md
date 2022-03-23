# AngularCountriesApp

## Structure

We are going to create a couple of modules to start building our app's structure. 

- modules

    In the first place we need to create a 'shared' module where we'll create every component that will be shared for the entire app's modules(e.g: sidebar, footer, menu, etc).

    ```
    ng g m shared
    ```
    ```
    ng g m countries
    ```
- components
    - sidebar

        In secon place, we have created the modules that we'll need in our app but we need the components to give them visual properties and logic

        In the case of our 'shared' module, we'll work with the sidebar component, so we'll create it inside this folder:

        ```
        ng g c shared/sidebar --skipTests -is
        ```

        **NOTE**: Remember to export the shared sidebar component to the entire app by the export's property at the module.

        ```
        @NgModule({
        declarations: [
            SidebarComponent
        ],
        exports:[
            SidebarComponent
        ],
        imports: [
            CommonModule
        ]
        })
        export class SharedModule { }
        ```
    - countries

        In this module we'll create our components, interfaces, pages and services
        ```
        ng g c countries/pages/byCapital --skipTests -is
        ng g c countries/pages/byCountry --skipTests -is
        ng g c countries/pages/byRegion --skipTests -is
        ng g c countries/pages/showCountry --skipTests -is
        ```
        **NOTE**: Remember to export the countrie's components to the entire app by the export's property at the module.
        ```
        @NgModule({
        declarations: [
            ByCapitalComponent,
            ByCountryComponent,
            ByRegionComponent,
            ShowCountryComponent
        ],
        exports:[
            ByCapitalComponent,
            ByCountryComponent,
            ByRegionComponent,
            ShowCountryComponent
        ],
        imports: [
            CommonModule
        ]
        })
        export class CountriesModule { }
        ```
Don't forget to import the created modules to the main app.module.ts script:
```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CountriesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## Routes

Define our app's routes it's a simple task that we can complete in a couple of steps. First of all we need to define our route's module in the app's folder:
- app-routing.module.ts
    ```
    // app's routes
    const routes: Routes = [
        // main route 
        {
            path:'', 
            component:ByCountryComponent, 
            pathMatch:'full'
        },
        // region route 
        {
            path:'region', 
            component:ByRegionComponent, 
            pathMatch:'full'
        },
        // capital route 
        {
            path:'capital', 
            component:ByCapitalComponent, 
            pathMatch:'full'
        },
        // country by id 
        {
            path:'country/:id', 
            component:ShowCountryComponent, 
            pathMatch:'full'
        },
        // exception to redirect to main route
        {
            path: '**', 
            redirectTo:''
        }
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
    ```
- app.module.ts

    Not to forget that we need to import this module in our app's module to use the routes we've declared:

    ```
    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, // <--
        CountriesModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
- app.component.hml
    ```
    <div class="row container mt-4">
        <div class="col-3">
            <h2>Search: </h2>
            <hr>
            <ul class="list-group">
                <li routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="list-group-item">
                    Search by Country
                </li>
                <li routerLink="region" routerLinkActive="active" class="list-group-item">
                    Search by Region
                </li>
                <li routerLink="capital" routerLinkActive="active" class="list-group-item">
                    Search by Capital
                </li>
            </ul>
        </div>
        <!-- Dynamic content by the route -->
        <div class="col">
            <router-outlet></router-outlet>
        </div>
    </div>
    ```
    - Notice that the html's tag property **routerlink** allows us to access to the declared routes at the module. The html < a > tag do the same but refresh the browser connection every time we use it. With the angular routerLink we can avoid it.

    - RouterLinkActive will add that property to the html tag's class and with bootstrap. it'll be painted.

    - [ routerLinkActiveOptions]="{exact: true}" is declared in the main route because we want to apply routerLinkActive's functionallity only if the route is exact the declared one on our route's module.

## Searching Logic
