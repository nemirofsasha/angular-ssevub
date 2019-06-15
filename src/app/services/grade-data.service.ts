import { Injectable } from "@angular/core";

import { Grade } from "../models/grade.model";

@Injectable({
  providedIn: "root"
})
export class GradeDataService {
  async readGrades(): Promise<Grade[]> {
    var grades: Object[] = JSON.parse(localStorage.getItem("grades"));
    return grades ? grades.map(data => new Grade(data)) : [];
  }

  async writeGrades(grades: Grade[]): Promise<void> {
    var serialized: string = JSON.stringify(grades);
    localStorage.setItem("grades", serialized);
  }

  async addGrade(grade: Grade): Promise<Grade> {
    var grades: Grade[] = await this.readGrades();
    var lastId: number = Math.max(...grades.map(grade => grade.id)) || 0;
    grade.id = lastId + 1;
    grades.push(grade);
    await this.writeGrades(grades);
    return grade;
  }

  async deleteGradeById(id: number): Promise<void> {
    var grades: Grade[] = await this.readGrades();
    grades = grades.filter(grade => grade.id !== id);
    await this.writeGrades(grades);
  }

  async updateGradeById(grade: Grade): Promise<Grade> {
    var grades: Grade[] = await this.readGrades();
    var index: number = grades.findIndex(x => x.id === grade.id);
    if (!index) return null;
    grades[index] = grade;
    await this.writeGrades(grades);
    return grade;
  }

  async getAllGrades(): Promise<Grade[]> {
    return await this.readGrades();
  }
}