import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSelectorComponent } from './instance-selector.component';

describe('InstanceSelectorComponent', () => {
  let component: InstanceSelectorComponent;
  let fixture: ComponentFixture<InstanceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
