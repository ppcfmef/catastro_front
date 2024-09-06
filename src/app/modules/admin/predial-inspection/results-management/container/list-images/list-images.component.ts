import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFoto } from '../../interfaces/foto.interface';
import { ITicket } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit,OnChanges {
    @Input() fotos: IFoto[] =[] ;
    @Input() ticket: ITicket ;

    listImg = [
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
        {url: 'https://e.rpp-noticias.io/large/2016/07/27/572657_204736.jpg'},
    ];
  constructor(
    private _activeRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {

    this.listImg=this.fotos.map((f: IFoto)=>({url:f.foto}));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listImg=this.fotos.map((f: IFoto)=>({url:f.foto}));
}
}
