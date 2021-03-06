import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {HeroService} from '../../core/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => {});
  }
}
