import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavParcialComponent } from './nav.component';

describe('NavParcialComponent', () => {
  let component: NavParcialComponent;
  let fixture: ComponentFixture<NavParcialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavParcialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
