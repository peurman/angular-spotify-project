import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMusicComponent } from './my-music.component';

describe('MyMusicComponent', () => {
  let component: MyMusicComponent;
  let fixture: ComponentFixture<MyMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
