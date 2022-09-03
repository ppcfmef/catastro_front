import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-placeholder',
  templateUrl: './search-placeholder.component.html',
  styleUrls: ['./search-placeholder.component.scss']
})
export class SearchPlaceholderComponent implements OnInit {

  @Input() texto = 'texto prueba';

  constructor() { }

  ngOnInit(): void {
  }

}
