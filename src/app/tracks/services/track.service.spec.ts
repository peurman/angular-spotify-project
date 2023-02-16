import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { Track } from 'src/app/profile/model/toptracks.interface';
import { Album } from 'src/app/home/models/new-releases.interface';
import { album } from './helpers/track.mocks';

describe('TrackService', () => {
  let service: TrackService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService],
    });
    service = TestBed.inject(TrackService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve track information', () => {
    const testTrack: Track = {
      id: '5ZULALImTm80tzUbYQYM9d',
      name: 'Bittersweet Symphony',
      album: album,
      preview_url: 'test',
      duration_ms: 2,
    };

    service.getTrackInfo(testTrack.id).subscribe((track: Track) => {
      expect(track).toBeTruthy();
      expect(track.id).toEqual(testTrack.id);
      expect(track.name).toEqual(testTrack.name);
      expect(track.album.name).toEqual(testTrack.album.name);
    });

    const req = httpTestingController.expectOne(
      `${service.BASE_API}/tracks/${testTrack.id}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testTrack);
  });

  it('should save track when save parameter is true', () => {
    const testTrackId = '5ZULALImTm80tzUbYQYM9d';

    service.saveRemoveTrack(testTrackId, true).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${service.BASE_API}/me/tracks`
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.ids).toContain(testTrackId);
    req.flush({});
  });

  it('should remove track when save parameter is false', () => {
    const testTrackId = '5ZULALImTm80tzUbYQYM9d';

    service.saveRemoveTrack(testTrackId, false).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${service.BASE_API}/me/tracks?ids=${testTrackId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
