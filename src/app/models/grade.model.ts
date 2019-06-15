export class Grade {
  id: number;
  studentName: string = "";
  value: number = 2.0;
  completed: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  static deserialize(values: Object = {}): Grade {
    return new Grade({
      id: values["id"],
      studentName: values["studentName"],
      value: values["value"],
      completed: values["completed"],
    });
  }

  serialize(): Object {
    return {
      id: this.id,
      studentName: this.studentName,
      completed: this.completed,
      value: this.value,
    };
  }
}