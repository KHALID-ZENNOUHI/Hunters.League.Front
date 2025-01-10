import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layouts/header/header.component";
import { FooterComponent } from "../../layouts/footer/footer.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { CompetitionService } from "../../services/competition/competition.service";
import { CommonModule, DatePipe } from "@angular/common";
import {CompetitionModalComponent} from "../../components/competition-modal/competition-modal.component";
import {Competition} from "../../model/competition";

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    DatePipe,
    CommonModule,
    CompetitionModalComponent
  ],
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  competition: any[] = [];
  totalPages: number = 0;
  page: number = 0;
  size: number = 9;
  isDataLoading = false;
  showModal = false;
  selectedCompetition: Competition | null = null;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.competitionService.getCompetitions(this.page, this.size)
      .subscribe(
        (response) => {
          console.log('Competition list:', response);
          this.competition = response.content.map((comp: Competition) => ({
            id: comp.id,
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

  openModal(competition: Competition | null = null): void {
    this.selectedCompetition = competition;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCompetition = null;
  }

  saveCompetition(competitionData: Competition): void {
    if (this.selectedCompetition) {
      this.competitionService.update(competitionData).subscribe(
        () => {
          console.log('Competition updated successfully');
          this.loadCompetitions();
          this.closeModal();
        },
        (error) => console.error('Error updating competition:', error)
      );
    } else {
      this.competitionService.create(competitionData).subscribe(
        () => {
          console.log('Competition created successfully');
          this.loadCompetitions();
          this.closeModal();
        },
        (error) => console.error('Error creating competition:', error)
      );
    }
  }

  deleteCompetition(id: string): void {
    if (confirm('Are you sure you want to delete this competition?')) {
      this.competitionService.delete(id).subscribe(
        () => {
          console.log('Competition deleted successfully');
          this.loadCompetitions();
        },
        (error) => console.error('Error deleting competition:', error)
      );
    }
  }
}
