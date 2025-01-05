import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionModalComponent } from './competition-modal.component';

describe('CompetitionModalComponent', () => {
  let component: CompetitionModalComponent;
  let fixture: ComponentFixture<CompetitionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
