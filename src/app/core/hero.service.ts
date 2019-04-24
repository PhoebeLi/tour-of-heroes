import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { HEROES} from '../mock-heroes';
import { MessageService } from './message.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /**
   * The structure of the url is based on hoe the in-memory db is created.
   * the name of the reources in the url refers to the key in the db. For
   * instance, heroes exists in the db object as one of the keys. 'api/metadata'
   * will retrieve value of metadatd in db.
   *
   */
  private heroesUrl = 'api/heroes';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.log('fetched heroes');

    // <Type> returns a typed result object. Otherwise it is untyped JSON object.
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`operation id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions)
      .pipe(
        tap((deletedHero: Hero) => this.log(`deleted hero w/ id=${deletedHero.id}`)),
        catchError(this.handleError<any>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
