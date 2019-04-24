import { Component, OnInit } from '@angular/core';
import {Hero} from '../../hero';
import { HeroService } from '../../core/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>
        this.heroes = heroes
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero)
      .subscribe(() => this.heroes = this.heroes.filter(h => h !== hero));
  }
}
