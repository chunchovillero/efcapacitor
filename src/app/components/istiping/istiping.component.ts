import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-istiping',
  templateUrl: './istiping.component.html',
  styleUrls: ['./istiping.component.scss'],
})
export class IstipingComponent implements OnInit {
  @Input() idchat: any;


  constructor() { }

  ngOnInit() {}

}
