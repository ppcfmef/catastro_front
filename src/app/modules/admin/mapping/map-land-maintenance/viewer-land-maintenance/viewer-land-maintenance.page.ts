import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-viewer-land-maintenance',
  templateUrl: './viewer-land-maintenance.page.html',
  styleUrls: ['./viewer-land-maintenance.page.scss']
})
export class ViewerLandMaintenancePage implements OnInit {
  rawUrl: URL;
  url: SafeResourceUrl;
  hideSelectUbigeo = false;
  ubigeo: string;
  idView = 'gesmapmain';
  private customViewerUrl = environment.customViewerUrl;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) { }

  ngOnInit(): void {

    this.navigationAuthorizationService.userScopePermission(this.idView)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: any) => {
      if(!data?.limitScope){
        this.ubigeo = environment.defaultUbigeo;
        this.hideSelectUbigeo = false;
      }
      else {
        this.hideSelectUbigeo = true;
        this.ubigeo = data?.ubigeo;
      }

      const username = data?.username;
      this.rawUrl = new URL(
        `${this.customViewerUrl}/index.html?username=${username}&ubigeo=${this.ubigeo}`
      );
      this.setUrl();

      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    });
  }

  onSelectUbigeo(ubigeo: string): void {
    this.rawUrl.searchParams.set('ubigeo', ubigeo);
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    this.setUrl();
  }

  private setUrl(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl.href);
  }

}
