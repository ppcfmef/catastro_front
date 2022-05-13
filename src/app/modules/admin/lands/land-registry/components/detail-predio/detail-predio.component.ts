import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-predio',
  templateUrl: './detail-predio.component.html',
  styleUrls: ['./detail-predio.component.scss']
})
export class DetailPredioComponent implements OnInit {
  @Input() landRecord: any;
  @Input() landOwner: any;
  @Input() builtArea: any;

  constructor() { }

  ngOnInit(): void {
  }

}
