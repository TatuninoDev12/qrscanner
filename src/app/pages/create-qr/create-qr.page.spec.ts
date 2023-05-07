import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQRPage } from './create-qr.page';

describe('CreateQRPage', () => {
  let component: CreateQRPage;
  let fixture: ComponentFixture<CreateQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
