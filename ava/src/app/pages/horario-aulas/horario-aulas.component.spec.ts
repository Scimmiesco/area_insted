import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAulasComponent } from './horario-aulas.component';

describe('HorarioAulasComponent', () => {
  let component: HorarioAulasComponent;
  let fixture: ComponentFixture<HorarioAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioAulasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
