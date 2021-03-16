import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CerifyEmailPage } from './cerify-email.page';

describe('CerifyEmailPage', () => {
  let component: CerifyEmailPage;
  let fixture: ComponentFixture<CerifyEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerifyEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CerifyEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
