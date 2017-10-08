import { Component, OnInit } from '@angular/core';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-modeselect',
  templateUrl: './modeselect.component.html',
  styleUrls: ['./modeselect.component.css']
})
export class ModeselectComponent implements OnInit {

  constructor(public modeService: ModeService) { }

  ngOnInit() {
  }

}
