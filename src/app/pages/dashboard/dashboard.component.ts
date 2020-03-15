import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MazeService } from '../../shared/maze/maze.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public value: string;
    row = 20;
    col = 30;
    length = 20;
    private maze: MazeService;
    private canvas: HTMLCanvasElement;

    constructor(public authService: AuthService, private message: NzMessageService) {}

    ngOnInit() {
        this.generateEAN();
    }

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('maze') as HTMLCanvasElement;
        this.generateMaze();
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

    generateMaze() {
        console.log('generate Maze');
        this.maze = new MazeService(this.row, this.col);
        this.canvas.width = this.col * this.length;
        this.canvas.height = this.row * this.length;
        this.maze.draw(this.canvas, this.length);
    }

    generatePath() {
        console.log('generate Path');
        this.maze.drawPath(this.canvas, this.length);
    }

    downloadImage() {
        const canvas = document.getElementById('maze') as HTMLCanvasElement;
        const image = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.download = `maze.png`;
        link.href = image;
        link.click();
    }
}
