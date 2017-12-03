import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolComponent } from './privacy-pol.component';

describe('PrivacyPolComponent', () => {
  let component: PrivacyPolComponent;
  let fixture: ComponentFixture<PrivacyPolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
