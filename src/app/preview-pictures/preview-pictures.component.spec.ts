import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPicturesComponent } from './preview-pictures.component';

describe('PreviewPicturesComponent', () => {
  let component: PreviewPicturesComponent;
  let fixture: ComponentFixture<PreviewPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
