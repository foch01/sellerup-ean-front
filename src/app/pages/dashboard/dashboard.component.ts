import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit() {}
}
