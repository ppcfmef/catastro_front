import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

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
            dni:'44458926'
        };

    constructor() { }

    ngOnInit(): void {
    }

}
