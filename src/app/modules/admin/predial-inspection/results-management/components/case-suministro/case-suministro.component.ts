import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-suministro',
  templateUrl: './case-suministro.component.html',
  styleUrls: ['./case-suministro.component.scss']
})
export class CaseSuministroComponent implements OnInit {

    isOpen = false;
    @Input() set ticket(data: any) {
        this.tickets = data;
    }
    tickets =
        {
            tipo:1,
            codCase: '00986',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1
        };

  constructor() { }

  ngOnInit(): void {
  }

}
