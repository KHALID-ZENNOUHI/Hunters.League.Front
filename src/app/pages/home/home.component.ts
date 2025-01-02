import { Component } from '@angular/core';
import {HeaderComponent} from "../../layouts/header/header.component";
import {HeroComponent} from "../../components/home/hero/hero.component";
import {TypeComponent} from "../../components/home/type/type.component";
import {AboutComponent} from "../../components/home/about/about.component";
import {PricingComponent} from "../../components/home/pricing/pricing.component";
import {FaqComponent} from "../../components/home/faq/faq.component";
import {FooterComponent} from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    TypeComponent,
    AboutComponent,
    PricingComponent,
    FaqComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
