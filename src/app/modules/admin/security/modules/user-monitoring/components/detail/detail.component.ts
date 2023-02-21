import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {Role, User, UserCreate} from 'app/core/user/user.types';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() showMe = false;
  @Input() dataSource = [];
  @Input() selectedUser: User;
  @Output() showList = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nro', 'module', 'action', 'date'];
  defaultPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  showHistoryList(): void {
    this.showList.emit(!this.showMe);
  }

  print(){
    window.print();
  }
}
