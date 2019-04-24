import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './feature/heroes/heroes.component';
import { HeroDetailComponent } from './feature/hero-detail/hero-detail.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MessagesComponent } from './feature/messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import {InMemoryDataService} from './core/in-memory-data.service';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { HeroSearchComponent } from './feature/hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
