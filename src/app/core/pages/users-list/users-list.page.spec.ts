import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListPage } from './users-list.page';

describe('UsersListPage', () => {
  let component: UsersListPage;
  let fixture: ComponentFixture<UsersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListPage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
