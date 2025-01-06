import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Species} from "../../../model/species";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-species-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './species-modal.component.html',
  styleUrl: './species-modal.component.css'
})
export class SpeciesModalComponent {
  @Input() species: Species | null = null;
  @Output() onSave = new EventEmitter<Species>();
  @Output() onCancel = new EventEmitter<void>();
  speciesForm: FormGroup;
   category = ['BIRD', 'SEA', 'BIG_GAME'];
   difficulty = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY'];

   constructor(private fb: FormBuilder) {
     this.speciesForm = this.fb.group({
       id: [''],
       name: ['', [Validators.required, Validators.minLength(3)]],
       category: [null, [Validators.required]],
       difficulty: [null, [Validators.required]],
       minimumWeight: [1, [Validators.required, Validators.min(1)]],
       points: [0, [Validators.required, Validators.min(0)]],
     });
   }

   ngOnChanges(): void {
     if (this.species) {
       this.speciesForm.patchValue(this.species);
     } else {
       this.speciesForm.reset();
     }
   }

    save(): void {
      if (this.speciesForm.valid) {
        console.log('Form values:', this.speciesForm.value);
        this.onSave.emit(this.speciesForm.value);
      }
    }

    cancel(): void {
     this.onCancel.emit();
    }

}
