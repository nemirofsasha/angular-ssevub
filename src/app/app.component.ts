import { Component } from '@angular/core';

import { Grade } from './models/grade.model';
import { GradeDataService } from './services/grade-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [GradeDataService]
})
export class AppComponent  {
  newGrade: Grade = new Grade();
  grades: Grade[] = [];

  constructor(private gradeDataService: GradeDataService) {
    this.init();
    this.removeGrade = this.removeGrade.bind(this);
    this.toggleGradeComplete = this.toggleGradeComplete.bind(this);
  }

  async init() {
    this.grades = await this.gradeDataService.getAllGrades();
  }

  async addGrade() {
    var saved: Grade = await this.gradeDataService.addGrade(this.newGrade);
    this.grades.push(saved);
    this.newGrade = new Grade();
  }

  async toggleGradeComplete(grade: Grade) {
    grade.completed = !grade.completed;
    await this.gradeDataService.updateGradeById(grade);
  }

  async removeGrade(grade) {
    await this.gradeDataService.deleteGradeById(grade.id);
    this.grades = this.grades.filter((item: Grade) => item.id !== grade.id);
  }

  get sortedGrades(): Grade[] {
    return this.grades.sort((item: Grade) => -item.id);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/