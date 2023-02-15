import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/components/home.component';
import { LoginComponent } from '../components/login.component';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
