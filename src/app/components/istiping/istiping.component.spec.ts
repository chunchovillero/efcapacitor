import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IstipingComponent } from './istiping.component';

describe('IstipingComponent', () => {
  let component: IstipingComponent;
  let fixture: ComponentFixture<IstipingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstipingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IstipingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
