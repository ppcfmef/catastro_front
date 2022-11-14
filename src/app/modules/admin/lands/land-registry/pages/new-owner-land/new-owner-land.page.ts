import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-owner-land',
  templateUrl: './new-owner-land.page.html',
  styleUrls: ['./new-owner-land.page.scss']
})
export class NewOwnerLandPage implements OnInit {
  expandMap = true;
  initialPage = false;
  ownerId: number;
  landId: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ownerId = params.ownerId ? Number(params.ownerId) : params.ownerId;
      this.landId = params.landId ? Number(params.landId) : params.landId;
      this.initialPage = true;
    });
  }

}
