export class Prayer {
  taskid: number;
  org: number;
  description: string;
  ordinal: number;
  group: [boolean];

  active: boolean;
  date: Date;

  constructor(taskid: number, description: string, ordinal: number,
      groupa: boolean = false, groupb: boolean = false,
      groupx: boolean = false, active: boolean = true, date: Date = null) {

    this.taskid = taskid;
    this.description = description;
    this.ordinal = ordinal;
    this.active = active;
    this.group = [groupa, groupb, groupx];
  }

  public inGroup (g: number): boolean {
    if (this.group[g]) { return true; } // a or b
    if (g === 2 ) { return true; } // both
    if (g === 3 && this.group[3] ) { return true; } // special
    return false;
  }
}
