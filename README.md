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

In this point We're going to define our search logic with the error handling and typescript interfaces declarations:

- 1. Html search tag
    ```
    <h2>By Country</h2>
    <hr>

    <div class="row">
        <div class="col">
            <form (ngSubmit)="search()" autocomplete="off">
                <input type="text"
                    name="seacrh"
                    class="form-control"
                    [(ngModel)]="query"
                    placeholder="Search by country...">
            </form>
        </div>
    </div>

    <hr>
    ```
    ```
    <!-- Showing table only if search results is positive -->
    <div *ngIf="isError"
    class="alert alert-danger">
        Search doesn't return anything to '{{ query }}'
    </div>
    ```
    ```
    <!-- Showing table only if search results is positive -->
    <div *ngIf="!isError" class="row">

        ... table ...
    
    </div>
    ```
- 2. Search logic component
    ```
    export class ByCountryComponent {

        // initial query state
        query: string = "";

        // error handling
        isError: boolean = false;

        // service injection
        constructor(private countriesService: CountriesService) {}

        search() {

            // error handling declared as false in every search process
            this.isError = false;

            // http request by the service and error handling
            this.countriesService
            .searchCountry(this.query)
            .subscribe(
            (res) => {console.log(res);}, 
            (err) => {this.isError = true;}, 
            );
            
        }
    }
    ```
- 3. Search logic service
    ```
    export class CountriesService {

        // API url
        private apiUrl: string = 'https://restcountries.com/v2';

        // Service injection
        constructor(private http: HttpClient) { }

        // Https requests
        searchCountry(query: string): Observable<Country[]>{

            const url = `${this.apiUrl}/name/${query}`;

            // send info to the element that calls method
            return this.http.get<Country[]>(url)

        }
    }
    ```
- 4. Typescript types
    To declare our Country's typescript interface we'll use as a example any successful http request's result (I recommend to use an API client like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/product/api-client/) ) and we'll go to [QuickType](https://app.quicktype.io/).

        Once we go to the main page we should paste our request's result and specify typescript as a language and select the 'interfaces only' option. Now we can copy the content and paste in our interface's folder.
    ```
    export interface Country {
        name:           string;
        topLevelDomain: string[];
        alpha2Code:     string;
        alpha3Code:     string;
        callingCodes:   string[];
        capital:        string;
        altSpellings:   string[];
        subregion:      string;
        region:         string;
        population:     number;
        latlng:         number[];
        demonym:        string;
        area:           number;
        gini:           number;
        timezones:      string[];
        borders:        string[];
        nativeName:     string;
        numericCode:    string;
        flags:          Flags;
        currencies:     Currency[];
        languages:      Language[];
        translations:   Translations;
        flag:           string;
        regionalBlocs:  RegionalBloc[];
        cioc:           string;
        independent:    boolean;
    }

    export interface Currency {
        code:   string;
        name:   string;
        symbol: string;
    }

    export interface Flags {
        svg: string;
        png: string;
    }

    export interface Language {
        iso639_1:   string;
        iso639_2:   string;
        name:       string;
        nativeName: string;
    }

    export interface RegionalBloc {
        acronym: string;
        name:    string;
    }

    export interface Translations {
        br: string;
        pt: string;
        nl: string;
        hr: string;
        fa: string;
        de: string;
        es: string;
        fr: string;
        ja: string;
        it: string;
        hu: string;
    }

    ```
    **NOTICE** that we've generated a typescript interface to any country search with every sub interface and type. This is the reason to specify in out service's observable and get request as Country type.

## Rendering Table's info with API's request result

To render our API's request into our html code we should assign to an empty array in our **by-country.component.ts**:

```
export class ByCountryComponent {
  ...

  // data to render
  countries: Country[] = [];


  search() {
    // console.log(this.query);
    this.countriesService
    .searchCountry(this.query)
    .subscribe(
      (res) => {

        // setting our api's result in the countries empty array
        this.countries = res;
        
      }, 
      (err) => {
        this.isError = true;
        this.countries = [];
      }, 
      );
    
  }
}
```
In second place we should edit our table to iterate the array that we've crated in our ts component and render in any section the current value that we want to show:

```
<tbody>
    <tr *ngFor="let country of countries; let i = index">
        <td> {{ i + 1 }} </td>
        <td>
            <img class="small-flag" [src]="country.flags.png" alt="country_flag">
        </td>
        <td> {{ country.name}} </td>
        <td> {{ country.population | number}} </td>
        <td>
            <a [routerLink]="['/country', country.alpha2Code]">See...</a>
        </td>
    </tr>
</tbody>
```

**Notice** that when applied to an element in a template, makes that element a link that initiates navigation to a route. Navigation opens one or more routed components in one or more <router-outlet> locations on the page.
