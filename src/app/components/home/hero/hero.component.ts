import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit{
  title: string = 'Get started';
  url: string = 'login';
  constructor(protected authService: AuthService) {
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.title = 'Discover More';
      this.url = 'competitions';
    }
  }


}
