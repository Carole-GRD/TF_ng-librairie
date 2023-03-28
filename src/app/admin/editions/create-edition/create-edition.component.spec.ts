import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditionComponent } from './create-edition.component';

describe('CreateEditionComponent', () => {
  let component: CreateEditionComponent;
  let fixture: ComponentFixture<CreateEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
