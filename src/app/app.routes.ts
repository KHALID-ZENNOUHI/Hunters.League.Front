import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {CompetitionComponent} from "./pages/competition/competition.component";
import {SpeciesComponent} from "./pages/species/species.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'competitions',
    component: CompetitionComponent,
  },
  {
    path: 'species',
    component: SpeciesComponent,
  },
  { path: '**', redirectTo: '' }
];
