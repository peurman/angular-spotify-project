import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CallbackGuard } from './callback.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';

describe('CallbackGuard', () => {
  let guard: CallbackGuard;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [CallbackGuard, AuthService, provideMockStore({})],
    });
    httpMock = TestBed.inject(HttpTestingController);
    guard = TestBed.inject(CallbackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
