import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {} from '../../models/authtoken.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}
}
