import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UltimomensajeComponent } from './ultimomensaje.component';

describe('UltimomensajeComponent', () => {
  let component: UltimomensajeComponent;
  let fixture: ComponentFixture<UltimomensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimomensajeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UltimomensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
