import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-ratinglist',
  templateUrl: './ratinglist.component.html',
  styleUrls: ['./ratinglist.component.css']
})
export class RatinglistComponent implements OnInit {

  STService: StudentsService;
  students = [];
  constructor(STService: StudentsService) {
    this.STService = STService;
  }

  ngOnInit() {
    this.students = this.STService.getStudents();
  }

}
