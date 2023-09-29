import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {

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
  }


}
