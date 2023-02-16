import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AlbumsComponent } from 'src/app/albums/components/albums.component';
import { CategoriesComponent } from 'src/app/categories/components/categories/categories.component';
import { GenresComponent } from 'src/app/genres/components/genres.component';
import { PlaylistsComponent } from 'src/app/playlists/components/playlists.component';
import { RootState } from 'src/app/store';
import { getAlbumDetailAction } from 'src/app/store/album/album.actions';
import {
  getCategoriesAction,
  getCategoriesPlaylistAction,
} from 'src/app/store/categories/categories.actions';
import { getFeaturedPlaylistsAction } from 'src/app/store/featured-playlists/featured-playlists.actions';
import { getNewReleasesAction } from 'src/app/store/new-releases/new-releases.actions';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';
import { getRecommendationsAction } from 'src/app/store/recommendations/recommendations.actions';
import { Category } from '../models/categories.interface';

import { HomeComponent } from './home.component';
import { MainPageComponent } from './main-page/main-page.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MainPageComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'albums',
            component: AlbumsComponent,
          },
          {
            path: 'playlists',
            component: PlaylistsComponent,
          },
          {
            path: 'categories',
            component: CategoriesComponent,
          },
          {
            path: 'genres',
            component: GenresComponent,
          },
        ]),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getNewReleasesAction on newReleasesPreviousClick', () => {
    spyOn(component, 'newReleasesPreviousClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.newReleasesPrevious = 'previous-test';
    fixture.detectChanges();
    component.newReleasesPreviousClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getNewReleasesAction({
        url: 'previous-test',
      })
    );
  });
  it('should dispatch getNewReleasesAction on newReleasesNextClick', () => {
    spyOn(component, 'newReleasesNextClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.newReleasesNext = 'next-test';
    fixture.detectChanges();
    component.newReleasesNextClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getNewReleasesAction({
        url: 'next-test',
      })
    );
  });
  it('should dispatch getCategoriesAction on categoriesPreviousClick', () => {
    spyOn(component, 'categoriesPreviousClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.categoriesPrevious = 'previous-category-test';
    fixture.detectChanges();
    component.categoriesPreviousClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getCategoriesAction({
        url: 'previous-category-test',
      })
    );
  });
  it('should dispatch getCategoriesAction on categoriesNextClick', () => {
    spyOn(component, 'categoriesNextClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.categoriesNext = 'next-category-test';
    fixture.detectChanges();
    component.categoriesNextClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getCategoriesAction({
        url: 'next-category-test',
      })
    );
  });
  it('should dispatch getFeaturedPlaylistsAction on featuredPlaylistsPreviousClick', () => {
    spyOn(component, 'featuredPlaylistsPreviousClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.featuredPlaylistsPrevious = 'previous-playlist-test';
    fixture.detectChanges();
    component.featuredPlaylistsPreviousClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getFeaturedPlaylistsAction({
        url: 'previous-playlist-test',
      })
    );
  });
  it('should dispatch getFeaturedPlaylistsAction on featuredPlaylistsNextClick', () => {
    spyOn(component, 'featuredPlaylistsNextClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.featuredPlaylistsNext = 'next-playlist-test';
    fixture.detectChanges();
    component.featuredPlaylistsNextClick();
    expect(store.dispatch).toHaveBeenCalledWith(
      getFeaturedPlaylistsAction({
        url: 'next-playlist-test',
      })
    );
  });
  it('should dispatch getAlbumDetailAction on goToAlbum', () => {
    spyOn(component, 'goToAlbum').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToAlbum('1');
    expect(store.dispatch).toHaveBeenCalledWith(
      getAlbumDetailAction({
        id: '1',
      })
    );
  });
  it('should dispatch getPlaylistAction on goToPlaylist', () => {
    spyOn(component, 'goToPlaylist').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToPlaylist('testPlaylist');
    expect(store.dispatch).toHaveBeenCalledWith(
      getPlaylistAction({
        id: 'testPlaylist',
        url: '',
      })
    );
  });
  it('should dispatch getCategoriesPlaylistAction on goToCategory', () => {
    const category: Category = {
      href: 'https://api.spotify.com/v1/browse/categories/toplists',
      icons: [
        {
          height: 274,
          url: 'https://t.scdn.co/media/derived/toplists_111605_474c45220ee5e5f5c5d5efcf3a3a7e98_0_0_274_274.jpg',
          width: 274,
        },
      ],
      id: 'toplists',
      name: 'Top Lists',
    };
    spyOn(component, 'goToCategory').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToCategory(category);
    expect(store.dispatch).toHaveBeenCalledWith(
      getCategoriesPlaylistAction({
        category,
        url: '',
      })
    );
  });
  it('should dispatch getRecommendationsAction on goToGenre', () => {
    spyOn(component, 'goToGenre').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToGenre('testGenre');
    expect(store.dispatch).toHaveBeenCalledWith(
      getRecommendationsAction({
        genreName: 'testGenre',
      })
    );
  });
});
