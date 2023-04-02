import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  constructor() { }

  readonly newItem = new FormGroup({});

  ngOnInit(): void {

  }

}
