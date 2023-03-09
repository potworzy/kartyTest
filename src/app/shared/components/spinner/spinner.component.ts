import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
