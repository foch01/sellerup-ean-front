import { TestBed, async, inject } from '@angular/core/testing';

import { InnerPagesGuard } from './inner-pages.guard';

describe('InnerPagesGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InnerPagesGuard],
        });
    });

    it('should ...', inject([InnerPagesGuard], (guard: InnerPagesGuard) => {
        expect(guard).toBeTruthy();
    }));
});
