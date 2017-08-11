export class Prayer {
  TaskID: number;
  OrgID: number;
  TaskName: string;
  ordinal: number;

  constructor(TaskID: number, OrgID: number, TaskName: string, ordinal: number) {
    this.OrgID = OrgID;
    this.TaskID = TaskID;
    this.TaskName = TaskName;
    this.ordinal = ordinal;
  }
}
