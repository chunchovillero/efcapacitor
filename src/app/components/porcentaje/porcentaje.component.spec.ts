import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PorcentajeComponent } from './porcentaje.component';

describe('PorcentajeComponent', () => {
  let component: PorcentajeComponent;
  let fixture: ComponentFixture<PorcentajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorcentajeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PorcentajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
