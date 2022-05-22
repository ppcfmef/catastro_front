import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-history',
  templateUrl: './upload-history.page.html',
  styleUrls: ['./upload-history.page.scss']
})
export class UploadHistoryPage implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onGoToNewRecord(): void {
    this._router.navigate(['/land/registry/upload'], {relativeTo: this._activatedRoute});
  }
}
