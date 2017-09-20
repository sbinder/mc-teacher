export class Prayer {
  prid: number;
  org: number;
  description: string;
  ordinal: number;
  groupa: boolean;
  groupb: boolean;
  groupx: boolean;
  active: boolean;
  date: Date;

  constructor(prid: number, description: string, ordinal: number,
      groupa: boolean = false, groupb: boolean = false,
      groupx: boolean = false, active: boolean = true, date: Date = null) {

    this.prid = prid;
    this.description = description;
    this.ordinal = ordinal;
    this.active = active;
    this.groupa = groupa;
    this.groupb = groupb;
    this.groupx = groupx;
  }
}
