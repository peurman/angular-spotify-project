import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Category } from 'src/app/home/models/categories.interface';
import { PlaylistsComponent } from 'src/app/playlists/components/playlists.component';
import { RootState } from 'src/app/store';
import { getCategoriesPlaylistAction } from 'src/app/store/categories/categories.actions';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let store: MockStore<RootState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [provideMockStore({})],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'playlists', component: PlaylistsComponent },
        ]),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getPlaylistAction on goToPlaylist', () => {
    spyOn(component, 'goToPlaylist').and.callThrough();
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    const id = '1';
    component.goToPlaylist(id);
    expect(component.goToPlaylist).toHaveBeenCalledWith(id);
    expect(store.dispatch).toHaveBeenCalledWith(
      getPlaylistAction({ id, url: '' })
    );
  });
  it('should dispatch getCategoriesPlaylistAction on handlePreviousPlaylists', () => {
    spyOn(component, 'handlePreviousPlaylists').and.callThrough();
    spyOn(store, 'dispatch');
    const category: Category = {
      href: 'https://api.spotify.com/v1/browse/categories/toplists',
      icons: [
        {
          height: 274,
          url: 'image.jpg',
          width: 274,
        },
      ],
      id: 'toplists',
      name: 'Top Lists',
    };
    component.category$ = of(category);
    component.playListsPrevious = 'test';
    fixture.detectChanges();
    component.handlePreviousPlaylists();
    expect(component.handlePreviousPlaylists).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      getCategoriesPlaylistAction({ category, url: 'test' })
    );
  });
  it('should dispatch getCategoriesPlaylistAction on handleNextPlaylists', () => {
    spyOn(component, 'handleNextPlaylists').and.callThrough();
    spyOn(store, 'dispatch');
    const category: Category = {
      href: 'https://api.spotify.com/v1/browse/categories/toplists',
      icons: [
        {
          height: 274,
          url: 'image.jpg',
          width: 274,
        },
      ],
      id: 'toplists',
      name: 'Top Lists',
    };
    component.category$ = of(category);
    component.playListsNext = 'test2';
    fixture.detectChanges();
    component.handleNextPlaylists();
    expect(component.handleNextPlaylists).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      getCategoriesPlaylistAction({ category, url: 'test2' })
    );
  });
});
