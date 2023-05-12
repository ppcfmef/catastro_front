import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-map-repository',
  templateUrl: './map-repository.page.html',
  styleUrls: ['./map-repository.page.scss']
})
export class MapRepositoryPage implements OnInit {

  title = 'Repositorio Cartográfico';
  portalUrl = environment.portalUrl;
  url: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.portalUrl}/apps/webappviewer/index.html?id=f8d1a2a316b346ca984a5fac0a540617`
    );
  }

}
