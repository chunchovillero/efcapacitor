import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargarPage } from './cargar.page';

describe('CargarPage', () => {
  let component: CargarPage;
  let fixture: ComponentFixture<CargarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
