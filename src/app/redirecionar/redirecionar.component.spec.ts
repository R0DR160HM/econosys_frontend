import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirecionarComponent } from './redirecionar.component';

describe('RedirecionarComponent', () => {
  let component: RedirecionarComponent;
  let fixture: ComponentFixture<RedirecionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirecionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirecionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
