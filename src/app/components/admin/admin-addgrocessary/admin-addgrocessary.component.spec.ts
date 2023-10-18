import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgrocessaryComponent } from './admin-addgrocessary.component';

describe('AdminAddgrocessaryComponent', () => {
  let component: AdminAddgrocessaryComponent;
  let fixture: ComponentFixture<AdminAddgrocessaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddgrocessaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddgrocessaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
