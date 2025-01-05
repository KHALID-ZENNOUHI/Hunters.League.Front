import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Competition } from '../../model/competition';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-competition-modal',
  templateUrl: './competition-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./competition-modal.component.css']
})
export class CompetitionModalComponent {
  @Input() competition: Competition | null = null;
  @Output() onSave = new EventEmitter<Competition>();
  @Output() onCancel = new EventEmitter<void>();

  competitionForm: FormGroup;

  speciesTypes = ['BIRD', 'SEA', 'BIG_GAME']; // Example species types

  constructor(private fb: FormBuilder) {
    this.competitionForm = this.fb.group({
      id: [''],
      date: ['', [Validators.required]],
      location: ['', [Validators.required]],
      speciesType: [null, [Validators.required]],
      minParticipants: [1, [Validators.required, Validators.min(1)]],
      maxParticipants: [1, [Validators.required, Validators.min(1)]],
      openRegistration: [false, [Validators.required]]
    });
  }

  ngOnChanges(): void {
    if (this.competition) {
      this.competitionForm.patchValue(this.competition);
    } else {
      this.competitionForm.reset();
    }
  }

  save(): void {
    if (this.competitionForm.valid) {
      console.log('Form values:', this.competitionForm.value);
      this.onSave.emit(this.competitionForm.value);
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
