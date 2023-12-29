import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBlogComponent } from './full-blog.component';

describe('FullBlogComponent', () => {
  let component: FullBlogComponent;
  let fixture: ComponentFixture<FullBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullBlogComponent]
    });
    fixture = TestBed.createComponent(FullBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
