import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "lesson",
  templateUrl: "./lesson-detail.component.html",
  styleUrls: ["./lesson-detail.component.css"],
})
export class LessonDetailComponent implements OnInit {
  lesson: LessonDetail;
  lesson$: Observable<LessonDetail>;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Created LessonDetailComponent...");
  }

  ngOnInit() {
    this.lesson$ = this.route.data.pipe(map((data) => data["lesson"]));
    //this.lesson = this.route.snapshot.data["lesson"];
  }

  onPrevious(lesson: LessonDetail) {
    this.router.navigate(["lessons", lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }

  onNext(lesson: LessonDetail) {
    this.router.navigate(["lessons", lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
