import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesModalComponent } from './species-modal.component';

describe('SpeciesModalComponent', () => {
  let component: SpeciesModalComponent;
  let fixture: ComponentFixture<SpeciesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeciesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
