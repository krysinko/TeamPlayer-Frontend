import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSimpleComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
    console.log(this.title);
  }

}
