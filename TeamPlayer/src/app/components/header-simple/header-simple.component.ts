import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header-simple',
    templateUrl: './header-simple.component.html',
    styleUrls: [ './header-simple.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSimpleComponent implements OnInit {
    @Input() title: string;
    @Input() arrowBack: boolean = false;

    constructor(private location: Location) {
    }

    ngOnInit() {
        console.log(this.title);
    }

    arrowBackAction(): void {
        if (this.arrowBack) {
            this.location.back();
        }
        return;
    }
}
