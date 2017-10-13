export class Prayer {
  taskid: number;
  org: number;
  description: string;
  ordinal: number;
  group: [boolean];
//  groupa: boolean;
//  groupb: boolean;
//  groupx: boolean;
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
    // this.groupa = groupa;
    // this.groupb = groupb;
    // this.groupx = groupx;
  }
}
