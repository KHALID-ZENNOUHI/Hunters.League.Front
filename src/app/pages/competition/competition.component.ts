import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layouts/header/header.component";
import { FooterComponent } from "../../layouts/footer/footer.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { CompetitionService } from "../../services/competition/competition.service";
import { CommonModule, DatePipe } from "@angular/common";

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  competition: any[] = [];
  totalPages = 0;
  page: number = 0;
  size: number = 9;
  isDataLoading = false;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.competitionService.getCompetitions(this.page, this.size)
      .subscribe(
        (response) => {
          console.log('Competition list:', response);
          this.competition = response.content.map((comp: any) => ({
            code: comp.code || '',
            date: comp.date || '',
            location: comp.location || '',
            openRegistration: comp.openRegistration || false,
            speciesType: comp.speciesType || ''
          }));
          this.totalPages = response.totalPages;
          this.isDataLoading = true;
        },
        (error) => {
          console.error('Error fetching competition list:', error);
          this.isDataLoading = false;
        }
      );
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadCompetitions();
  }
}
