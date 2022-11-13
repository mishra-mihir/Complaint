import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGreivanceComponent } from './post-greivance.component';

describe('PostGreivanceComponent', () => {
  let component: PostGreivanceComponent;
  let fixture: ComponentFixture<PostGreivanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGreivanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGreivanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
