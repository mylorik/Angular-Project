import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from './../data/position';
import { PositionService } from './../data/position.service';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  getPositionsSub: any;
  loadingError = false;

  constructor(private _positionService: PositionService) { }

  ngOnInit() {
    const loaderElem = document.getElementById('loaderID');

    this.getPositionsSub = this._positionService.getPositions().subscribe(
      res => {
        console.log('HTTP response', res);
        this.positions = res;
        loaderElem.parentNode.removeChild(loaderElem);
      },
      err => {
        console.log('HTTP Error', err);
        this.loadingError = true;
      },
      () => { console.log('HTTP request completed.'); });
  }
  ngOnDestroy() {
    if (this.getPositionsSub) {
      this.getPositionsSub.unsubscribe();
    }
  }
}
