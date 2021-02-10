import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retriveTutorials();
  }

  getRequestParams(searchTitle, page, pageSize): any {
    let params = {};

    if (searchTitle) {
      params['title']= searchTitle;
    }

    if (page) {
      params['page'] = page - 1;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }

    return params;
  }

  retriveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.tutorialService.getAll(params).subscribe(
      (response) => {
        const {tutorials, pages} = response;
        this.tutorials = tutorials;
        this.count = pages.count;
        console.log(response);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handlePageChange(event): void {
    this.page = event;
    this.retriveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retriveTutorials();
  }

  refreshList(): void {
    this.retriveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retriveTutorials();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
