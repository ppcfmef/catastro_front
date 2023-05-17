import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-viewer-land-maintenance',
  templateUrl: './viewer-land-maintenance.page.html',
  styleUrls: ['./viewer-land-maintenance.page.scss']
})
export class ViewerLandMaintenancePage implements OnInit {
  url: SafeResourceUrl;
  user: User;
  private customViewerUrl = environment.customViewerUrl;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.user$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((user: any) => {
      this.user = user;
      const username = this.user.username;
      const ubigeo = this.user.ubigeo ? this.user.ubigeo : environment.defaultUbigeo;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.customViewerUrl}/index.html?username=${username}&ubigeo=${ubigeo}`
      );
    });
  }

}
