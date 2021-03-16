import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountlikeComponent } from './countlike.component';

describe('CountlikeComponent', () => {
  let component: CountlikeComponent;
  let fixture: ComponentFixture<CountlikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountlikeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
