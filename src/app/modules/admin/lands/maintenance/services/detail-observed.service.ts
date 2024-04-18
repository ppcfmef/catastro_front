import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailObservedService {

  detailObserved$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  open$:BehaviorSubject<boolean> = new BehaviorSubject<any>(false);}
