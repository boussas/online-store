import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCategoriesComponent } from './sidebar-categories.component';

describe('SidebarCategoriesComponent', () => {
  let component: SidebarCategoriesComponent;
  let fixture: ComponentFixture<SidebarCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
