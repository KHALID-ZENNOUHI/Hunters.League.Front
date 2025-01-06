import { Component } from '@angular/core';
import { HeaderComponent } from "../../layouts/header/header.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { FooterComponent } from "../../layouts/footer/footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { SpeciesService } from "../../services/species/species.service";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {Species} from "../../model/species";
import {SpeciesModalComponent} from "../../components/species-modal/species-modal/species-modal.component";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    FooterComponent,
    NgForOf,
    NgClass,
    NgIf,
    CommonModule,
    SpeciesModalComponent
  ],
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent {
  page: number = 0;
  size: number = 9;
  isDataLoading = false;
  category?: string;
  totalPages: number = 0;
  species: Species[] = [];
  selectedSpecies: Species | null = null;
  showModal = false;

  constructor(private speciesService: SpeciesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.page = params['page'] ? +params['page'] : 0;
      this.size = params['size'] ? +params['size'] : 9;
      this.loadSpecies();
    });
  }

  loadSpecies(): void {
    this.speciesService.getSpecies(this.page, this.size, this.category).subscribe({
      next: (response) => {
        this.species = response.content;
        this.totalPages = response.totalPages;
        this.isDataLoading = true;
      },
      error: (error) => {
        console.error('Error fetching species:', error);
        this.isDataLoading = false;
      }
    });
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.router.navigate([], {
        queryParams: {
          page: newPage,
          size: this.size,
          category: this.category
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  getIconClass(category: string): string {
    switch (category) {
      case 'BIRD':
        return 'fa-solid fa-crow';
      case 'SEA':
        return 'fa-solid fa-fish';
      case 'BIG_GAME':
        return 'fa-solid fa-paw';
      default:
        return 'fa-solid fa-question';
    }
  }

  openModal(species: Species | null = null): void {
    this.selectedSpecies = species;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedSpecies = null;
  }

  saveSpecies(speciesData: Species): void {
    if (this.selectedSpecies) {
      this.speciesService.update(speciesData).subscribe(() => {
        console.log('Species updated successfully');
        this.loadSpecies();
        this.closeModal();
      });
    } else {
      this.speciesService.create(speciesData).subscribe(() => {
        console.log('Species created successfully');
        this.loadSpecies();
        this.closeModal();
      });
    }
  }

  deleteSpecies(id: string): void {
    this.speciesService.delete(id).subscribe(() => {
      console.log('Species deleted successfully');
      this.loadSpecies();
    });
  }
}
