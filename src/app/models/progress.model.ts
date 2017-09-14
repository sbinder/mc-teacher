export class Progress {
  StudentID: number;
  TaskID: number;
  TeacherID: number;
  Rating: number;
  StudentComment: string;
  TeacherComment: string;

  constructor(stid: number, taskid: number, tid: number, rating: number,
    tcomment: string, scomment: string) {
    this.StudentID = stid;
    this.TaskID = taskid;
    this.TeacherID = tid;
    this.Rating = rating;
    this.TeacherComment = tcomment;
    this.StudentComment = scomment;
  }
}
