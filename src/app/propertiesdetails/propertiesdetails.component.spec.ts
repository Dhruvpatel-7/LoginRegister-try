import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesdetailsComponent } from './propertiesdetails.component';

describe('PropertiesdetailsComponent', () => {
  let component: PropertiesdetailsComponent;
  let fixture: ComponentFixture<PropertiesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertiesdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
