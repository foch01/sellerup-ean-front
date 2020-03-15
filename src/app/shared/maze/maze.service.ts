import { Injectable } from '@angular/core';
import { CellService } from '../cell/cell.service';

/*@Injectable({
    providedIn: 'root',
})*/
export class MazeService {
    public readonly cells: Array<Array<CellService>> = [];

    /**
     * Create a maze with <row> &times; <col> cells.
     * @param nRow number of rows
     * @param nCol number of columns
     */
    constructor(public nRow: number, public nCol: number) {
        // initialize cells
        for (let i = 0; i < nRow; i++) {
            this.cells[i] = [];
            for (let j = 0; j < nCol; j++) {
                this.cells[i][j] = new CellService(i, j);
            }
        }

        // generate maze
        const current = this.cells[RandomNumber.within(this.nRow)][RandomNumber.within(this.nCol)];
        this.huntAndKill(current);
    }

    draw(canvas: HTMLCanvasElement, cellPixels: number, lineThickness = 2) {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineThickness;
        this.cells.forEach(x =>
            x.forEach(c => {
                c.draw(ctx, cellPixels);
            }),
        );
    }

    drawPath(canvas: HTMLCanvasElement, cellPixels: number, lineThickness = 4) {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineThickness;
        ctx.strokeStyle = '#4080ff';
        ctx.beginPath();
        ctx.moveTo(0, cellPixels / 2);

        this.findPath().forEach(x => ctx.lineTo((x.col + 0.5) * cellPixels, (x.row + 0.5) * cellPixels));
        ctx.lineTo(this.nCol * cellPixels, (this.nRow - 0.5) * cellPixels);
        ctx.stroke();
    }

    findPath(): Array<CellService> {
        this.cells.forEach(x => x.forEach(c => (c.traversed = false)));
        const start = this.cells[0][0];
        const end = this.cells[this.nRow - 1][this.nCol - 1];
        const path: Array<CellService> = [];
        path.unshift(start);

        while (1) {
            const current = path[0];
            current.traversed = true;

            if (current.equals(end)) {
                break;
            }

            const traversableNeighbors = this.getNeighbors(current)
                .filter(c => c.hasConnectionWith(current))
                .filter(c => !c.traversed);
            if (traversableNeighbors.length === 0) {
                path.splice(0, 1);
            } else {
                path.unshift(traversableNeighbors[0]);
            }
        }
        return path.reverse();
    }

    private huntAndKill(current: CellService) {
        const unvisitedNeighbors = this.getNeighbors(current).filter(c => !c.hasVisited());
        if (unvisitedNeighbors.length === 0) {
            // Hunt
            for (let huntRow = 0; huntRow < this.nRow; huntRow++) {
                for (let huntColumn = 0; huntColumn < this.nCol; huntColumn++) {
                    current = this.cells[huntRow][huntColumn];
                    if (current.hasVisited()) {
                        continue;
                    }
                    const visitedNeighbors = this.getNeighbors(current).filter(c => c.hasVisited());
                    if (visitedNeighbors.length < 1) {
                        continue;
                    }
                    const nextCell = visitedNeighbors[RandomNumber.within(visitedNeighbors.length)];
                    current.breakWallWith(nextCell);
                    this.huntAndKill(nextCell);
                }
            }
        } else {
            // Kill
            const nextCell = unvisitedNeighbors[RandomNumber.within(unvisitedNeighbors.length)];
            current.breakWallWith(nextCell);
            this.huntAndKill(nextCell);
        }
    }

    private getNeighbors(cell: CellService): Array<CellService> {
        const neighbors = [];
        if (cell.row - 1 >= 0) {
            neighbors.push(this.cells[cell.row - 1][cell.col]);
        }
        if (cell.row + 1 < this.nRow) {
            neighbors.push(this.cells[cell.row + 1][cell.col]);
        }
        if (cell.col - 1 >= 0) {
            neighbors.push(this.cells[cell.row][cell.col - 1]);
        }
        if (cell.col + 1 < this.nCol) {
            neighbors.push(this.cells[cell.row][cell.col + 1]);
        }
        return neighbors;
    }
}

class RandomNumber {
    static within(n: number): number {
        return Math.floor(Math.random() * n);
    }
}
