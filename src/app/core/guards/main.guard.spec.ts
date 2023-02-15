import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/login/services/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MainGuard } from './main.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/login/components/login.component';

describe('MainGuard', () => {
  let guard: MainGuard;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainGuard, AuthService, provideMockStore({})],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    guard = TestBed.inject(MainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
