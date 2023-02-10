import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlbumDetail } from '../models/albums.interface';

import * as fromAlbum from 'src/app/store/album/album.selectors';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(private store: Store) {}

  albumDetail$!: Observable<AlbumDetail | null>;

  ngOnInit(): void {
    this.albumDetail$ = this.store.select(fromAlbum.selectAlbumDetailData);
  }
}
