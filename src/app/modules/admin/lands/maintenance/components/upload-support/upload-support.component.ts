import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-support',
  templateUrl: './upload-support.component.html',
  styleUrls: ['./upload-support.component.scss']
})
export class UploadSupportComponent implements OnInit {
    //@Output() fileEventEmit<any>= new EventEmitter();
    @Output() fileEventEmit: EventEmitter<any> = new EventEmitter();
    fileName: string;

  constructor() { }

  ngOnInit(): void {
  }
  uploadFile(event): void {
    const fileToUpload = event.target.files.item(0);
    this.fileName = event.target.value;
    this.fileName = this.fileName.split(/(\\|\/)/g).pop();
    this.fileName = this.fileName.toString();
    this.fileEventEmit.emit(fileToUpload);
    /*if (fileToUpload) {
        this.fileUpload.setValue(fileToUpload);
        this.fileUpload.markAsDirty();
    }*/
}
}
