import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../core/user/user.service';
import {FormBuilder} from '@angular/forms';
import {FuseMediaWatcherService} from '../../../../../../@fuse/services/media-watcher';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _changeDetectorRef: ChangeDetectorRef,
      private _userService: UserService,
      private _fb: FormBuilder,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseConfirmationService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
  }



}
