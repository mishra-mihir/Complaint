import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGreivanceComponent } from './my-greivance.component';

describe('MyGreivanceComponent', () => {
  let component: MyGreivanceComponent;
  let fixture: ComponentFixture<MyGreivanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGreivanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGreivanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
