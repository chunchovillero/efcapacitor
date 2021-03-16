import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoritopComponent } from './storitop.component';

describe('StoritopComponent', () => {
  let component: StoritopComponent;
  let fixture: ComponentFixture<StoritopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoritopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoritopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
