import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEditionComponent } from './update-edition.component';

describe('UpdateEditionComponent', () => {
  let component: UpdateEditionComponent;
  let fixture: ComponentFixture<UpdateEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
