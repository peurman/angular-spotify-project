import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CallbackGuard } from './callback.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/components/home.component';
import { LoginComponent } from '../components/login.component';

describe('CallbackGuard', () => {
  let guard: CallbackGuard;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [CallbackGuard, AuthService, provideMockStore({})],
    });
    httpMock = TestBed.inject(HttpTestingController);
    guard = TestBed.inject(CallbackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
