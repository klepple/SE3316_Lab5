import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicpageComponent } from './publicpage.component';

describe('PublicpageComponent', () => {
  let component: PublicpageComponent;
  let fixture: ComponentFixture<PublicpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
