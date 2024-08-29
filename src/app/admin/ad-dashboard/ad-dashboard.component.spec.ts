import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDashboardComponent } from './ad-dashboard.component';

describe('AdDashboardComponent', () => {
  let component: AdDashboardComponent;
  let fixture: ComponentFixture<AdDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
