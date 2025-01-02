import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {FooterComponent} from "./layouts/footer/footer.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

];
