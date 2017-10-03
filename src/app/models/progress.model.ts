export class Progress {
  stid: number;
  taskid: number;
  tid: number;
  rating: number;
  scomment: string;
  tcomment: string;
  assigned: Date;
  changed: Date;

  constructor(stid: number, taskid: number, tid: number, rating: number,
    tcomment: string, scomment: string) {
    this.stid = stid;
    this.taskid = taskid;
    this.tid = tid;
    this.rating = rating;
    this.tcomment = tcomment;
    this.scomment = scomment;
  }
}
