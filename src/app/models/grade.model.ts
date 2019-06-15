export class Grade {
  id: number;
  studentName: string = "";
  value: number = 2.0;
  completed: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}