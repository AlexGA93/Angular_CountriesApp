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




