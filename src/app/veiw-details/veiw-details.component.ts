import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-veiw-details',
  templateUrl: './veiw-details.component.html',
  styleUrls: ['./veiw-details.component.css']
})
export class VeiwDetailsComponent implements OnInit {
  @Input('title') title;
  @Input('details') details;
  constructor() { }

  ngOnInit() {
  }

}
