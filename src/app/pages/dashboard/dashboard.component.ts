import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
    public value: string;
    constructor(public authService: AuthService, private message: NzMessageService) {}

    ngOnInit() {
        this.generateEAN();
    }

    generateEAN() {
        const results = [];
        const ponderations = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3];
        const rdmByPonderation = [];
        const divider = 10;
        let i = 0;
        while (i <= 11) {
            results.push(Math.floor(Math.random() * 10));
            i++;
        }
        ponderations.forEach((ponderation, index) => {
            rdmByPonderation.push(ponderation * results[index]);
        });
        const totalRdmByPonderation = rdmByPonderation.reduce((a, b) => a + b, 0);
        const restDivisionTotalRdmByPonderationAndDivider = totalRdmByPonderation % divider;
        const keyEAN13 = divider - restDivisionTotalRdmByPonderationAndDivider;
        if (restDivisionTotalRdmByPonderationAndDivider === 0) {
            results.push(0);
        } else {
            results.push(keyEAN13);
        }
        this.value = results.join('');
    }

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.message.create('success', `Le code EAN est prêt à être coller.`);
    }
}
