import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  Artist,
  Artists,
  Album,
  Albums,
  Playlist,
  Playlists,
  Track,
  Tracks,
} from '../models/search.interface';

import { getSearchArtistsAction } from 'src/app/store/search-artists/search-artists.actions';
import * as fromSearchArtists from 'src/app/store/search-artists/search-artists.selectors';

import { getSearchAlbumsAction } from 'src/app/store/search-albums/search-albums.actions';
import * as fromSearchAlbums from 'src/app/store/search-albums/search-albums.selectors';

import { getSearchPlaylistsAction } from 'src/app/store/search-playlists/search-playlists.actions';
import * as fromSearchPlaylists from 'src/app/store/search-playlists/search-playlists.selectors';

import { getSearchTracksAction } from 'src/app/store/search-tracks/search-tracks.actions';
import * as fromSearchTracks from 'src/app/store/search-tracks/search-tracks.selectors';

import { getAlbumDetailAction } from 'src/app/store/album/album.actions';
import { getTrackAction } from 'src/app/store/track/track.actions';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';
import { getArtistAction } from 'src/app/store/artist/artist.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  defaultAlbum = '../../../assets/images/defaultAlbum.jpg';
  defaultArtist = '../../../assets/images/defaultArtist.jpg';
  searchImage = '../../../assets/images/searchMusic.jpg';
  searchTerm = '';
  searchInput = new Subject<string>();

  searchArtists: Artist[] = [];
  searchArtistsNext: string | null = '';
  searchArtistsPrevious: string | null = '';
  searchArtists$!: Observable<Artists | null>;
  searchArtistsIsLoading$!: Observable<boolean>;

  searchAlbums: Album[] = [];
  searchAlbumsNext: string | null = '';
  searchAlbumsPrevious: string | null = '';
  searchAlbums$!: Observable<Albums | null>;
  searchAlbumsIsLoading$!: Observable<boolean>;

  searchPlaylists: Playlist[] = [];
  searchPlaylistsNext: string | null = '';
  searchPlaylistsPrevious: string | null = '';
  searchPlaylists$!: Observable<Playlists | null>;
  searchPlaylistsIsLoading$!: Observable<boolean>;

  searchTracks: Track[] = [];
  searchTracksNext: string | null = '';
  searchTracksPrevious: string | null = '';
  searchTracks$!: Observable<Tracks | null>;
  searchTracksIsLoading$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.searchArtists$ = this.store.select(
      fromSearchArtists.selectSearchArtistsData
    );
    this.searchArtistsIsLoading$ = this.store.select(
      fromSearchArtists.selectIsLoading
    );

    this.searchAlbums$ = this.store.select(
      fromSearchAlbums.selectSearchAlbumsData
    );
    this.searchAlbumsIsLoading$ = this.store.select(
      fromSearchAlbums.selectIsLoading
    );

    this.searchPlaylists$ = this.store.select(
      fromSearchPlaylists.selectSearchPlaylistsData
    );
    this.searchPlaylistsIsLoading$ = this.store.select(
      fromSearchPlaylists.selectIsLoading
    );

    this.searchTracks$ = this.store.select(
      fromSearchTracks.selectSearchTracksData
    );
    this.searchTracksIsLoading$ = this.store.select(
      fromSearchTracks.selectIsLoading
    );

    // Input
    this.searchInput
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((term) => {
        this.store.dispatch(
          getSearchArtistsAction({ url: '', searchedTerm: term })
        );
        this.store.dispatch(
          getSearchAlbumsAction({ url: '', searchedTerm: term })
        );
        this.store.dispatch(
          getSearchPlaylistsAction({ url: '', searchedTerm: term })
        );
        this.store.dispatch(
          getSearchTracksAction({ url: '', searchedTerm: term })
        );
      });
    //Artists
    this.searchArtists$.subscribe((res) => {
      if (res) {
        this.searchArtists = res.items;
        this.searchArtistsNext = res.next;
        this.searchArtistsPrevious = res.previous;
      }
    });
    // Albums
    this.searchAlbums$.subscribe((res) => {
      if (res) {
        this.searchAlbums = res.items;
        this.searchAlbumsNext = res.next;
        this.searchAlbumsPrevious = res.previous;
      }
    });
    // Playlists
    this.searchPlaylists$.subscribe((res) => {
      if (res) {
        this.searchPlaylists = res.items;
        this.searchPlaylistsNext = res.next;
        this.searchPlaylistsPrevious = res.previous;
      }
    });
    // Tracks
    this.searchTracks$.subscribe((res) => {
      if (res) {
        this.searchTracks = res.items;
        this.searchTracksNext = res.next;
        this.searchTracksPrevious = res.previous;
      }
    });
  }

  // Artists
  goToPreviousSearchArtists() {
    this.store.dispatch(
      getSearchArtistsAction({
        url: this.searchArtistsPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchArtists() {
    this.store.dispatch(
      getSearchArtistsAction({ url: this.searchArtistsNext, searchedTerm: '' })
    );
  }
  goToArtist(artistId: string) {
    this.store.dispatch(getArtistAction({ id: artistId }));
    this.router.navigateByUrl('artists');
  }
  // Albums
  goToPreviousSearchAlbums() {
    this.store.dispatch(
      getSearchAlbumsAction({
        url: this.searchAlbumsPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchAlbums() {
    this.store.dispatch(
      getSearchAlbumsAction({ url: this.searchAlbumsNext, searchedTerm: '' })
    );
  }
  goToAlbum(albumId: string) {
    this.store.dispatch(getAlbumDetailAction({ id: albumId }));
    this.router.navigateByUrl('albums');
    window.scrollTo(0, 0);
  }
  // Playlists
  goToPreviousSearchPlaylists() {
    this.store.dispatch(
      getSearchPlaylistsAction({
        url: this.searchPlaylistsPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchPlaylists() {
    this.store.dispatch(
      getSearchPlaylistsAction({
        url: this.searchPlaylistsNext,
        searchedTerm: '',
      })
    );
  }
  goToPlaylist(playlistId: string) {
    this.store.dispatch(getPlaylistAction({ id: playlistId }));
    this.router.navigateByUrl('playlists');
    window.scrollTo(0, 0);
  }
  // Tracks
  goToPreviousSearchTracks() {
    this.store.dispatch(
      getSearchTracksAction({
        url: this.searchTracksPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchTracks() {
    this.store.dispatch(
      getSearchTracksAction({
        url: this.searchTracksNext,
        searchedTerm: '',
      })
    );
  }
  goToTrack(trackId: string) {
    this.store.dispatch(getTrackAction({ id: trackId }));
    this.router.navigateByUrl('tracks');
    window.scrollTo(0, 0);
  }
}
