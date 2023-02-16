import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ArtistinfoService } from '../../services/artistinfo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistCardComponent } from './artist-card.component';
import { Artist, ArtistType } from 'src/app/home/models/new-releases.interface';

describe('ArtistCardComponent', () => {
  let component: ArtistCardComponent;
  let fixture: ComponentFixture<ArtistCardComponent>;
  let artistinfoService: ArtistinfoService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistCardComponent],
      providers: [provideMockStore({}), ArtistinfoService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistCardComponent);
    component = fixture.componentInstance;
    artistinfoService = TestBed.inject(ArtistinfoService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit followUnFollowEvent on handleClick with follow type', () => {
    spyOn(component, 'handleClick').and.callThrough();
    spyOn(component.followUnFollowEvent, 'emit');
    const artist: Artist = {
      id: '1',
      name: 'Test Artist',
      external_urls: { spotify: 'https://open.spotify.com/artist/1' },
      href: 'https://api.spotify.com/v1/artists/1',
      images: [],
      type: ArtistType.Artist,
      uri: 'spotify:artist:1',
      followers: { href: null, total: 0 },
      isFollowing: false,
    };
    component.artist = artist;
    fixture.detectChanges();
    component.handleClick();
    expect(component.followUnFollowEvent.emit).toHaveBeenCalledWith({
      type: 'follow',
      id: component.artist.id,
    });
  });
  it('should emit followUnFollowEvent on handleClick with unfollow type', () => {
    spyOn(component, 'handleClick').and.callThrough();
    spyOn(component.followUnFollowEvent, 'emit');
    const artist: Artist = {
      id: '1',
      name: 'Test Artist',
      external_urls: { spotify: 'https://open.spotify.com/artist/1' },
      href: 'https://api.spotify.com/v1/artists/1',
      images: [],
      type: ArtistType.Artist,
      uri: 'spotify:artist:1',
      followers: { href: null, total: 0 },
      isFollowing: true,
    };
    component.artist = artist;
    fixture.detectChanges();
    component.handleClick();
    expect(component.followUnFollowEvent.emit).toHaveBeenCalledWith({
      type: 'unfollow',
      id: component.artist.id,
    });
  });
  it('should emit artistClickedEvent on handleArtistClick', () => {
    spyOn(component, 'handleArtistClick').and.callThrough();
    spyOn(component.artistClickedEvent, 'emit');
    const artist: Artist = {
      id: '1',
      name: 'Test Artist',
      external_urls: { spotify: 'https://open.spotify.com/artist/1' },
      href: 'https://api.spotify.com/v1/artists/1',
      images: [],
      type: ArtistType.Artist,
      uri: 'spotify:artist:1',
      followers: { href: null, total: 0 },
      isFollowing: true,
    };
    fixture.detectChanges();
    component.handleArtistClick(artist.id);
    expect(component.artistClickedEvent.emit).toHaveBeenCalledWith(artist.id);
  });
});
