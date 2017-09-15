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
  liturgy: number;
  selected: boolean;

  constructor(stid: number, fname: string, lname: string, liturgy: number, target: Date) {
    this.stid = stid;
    this.fname = fname;
    this.lname = lname;
    this.liturgy = liturgy;
    this.target = target;
  }
}
