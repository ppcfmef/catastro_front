import { Component, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy,OnChanges {
    //observacion;
    inputControl: UntypedFormControl = new UntypedFormControl('');
    selectedFile: any = null;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    ngOnDestroy(): void {
        this.selectedFile =null;
    }
    ngOnChanges(): void {
        this.selectedFile =null;
      }
  ngOnInit(): void {
    this.selectedFile =null;
  }
  close(): void{
    this.dialogRef.close({option: false});
  }
  save(): void{
    this.dialogRef.close({option: true,data: this.data,file:this.selectedFile});
  }

  onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] ?? null;

 }
}
