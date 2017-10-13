export class Student {
  stid: number;
  org: number;
  target: Date;
  lname: string;
  fname: string;
  male: boolean;
  parent: number;
  teacher: number;
  email: string;
  note: string;
  username: string;
  password: string;
  expires: Date;
  trial: boolean;
  group: number;
  selected: boolean;

  constructor(stid: number, fname: string, lname: string, group: number, target: Date) {
    this.stid = stid;
    this.fname = fname;
    this.lname = lname;
    this.group = group;
    this.target = target;
  }
}
