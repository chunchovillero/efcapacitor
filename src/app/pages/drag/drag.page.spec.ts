import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DragPage } from './drag.page';

describe('DragPage', () => {
  let component: DragPage;
  let fixture: ComponentFixture<DragPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DragPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
