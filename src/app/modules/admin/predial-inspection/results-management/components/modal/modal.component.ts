import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    data;
    inputControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
