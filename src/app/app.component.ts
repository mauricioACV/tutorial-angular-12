import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  testProp = new FormControl('');

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.min(2)),
    lastName: new FormControl(''),
  });

  title = 'TutorialAngular12';

  title2 = 'Hello World How Are You Doing?';

  jsonValue = {
    a: 'Hello',
    b: 'World'
  };

  userObject = {
    id: 0,
    name: 'John',
    age: '32',
    isColored: true,
  }

  showUser: boolean = false;

  newDate = new Date();

  posts: any = [];

  constructor(private httpSvc: HttpService, private route: Router) {
    this.route.events.subscribe((e) => {
      console.log(e);
    })
  }

  ngOnInit() {
    this.getPosts();
  }

  goToRoute(route: string = '/fourth'): void {
    this.route.navigateByUrl(route).then(() => {
      console.log(this.route.url);
    })
  }

  modifyFormControl() {
    this.testProp.setValue('Hello World!');
  }

  handleHttpRequest() {
    this.httpSvc.getRequestReusable('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(resp => {
        this.jsonValue = resp;
      });
  }

  getPosts(): any {
    this.httpSvc.getRequestReusable('https://jsonplaceholder.typicode.com/posts')
      .subscribe(resp => {
        this.posts = resp
      });
  }

  handleShowUser() {
    this.showUser = !this.showUser;
  }

  handleEvent(event: any) {
    console.log(event);
  }

  handleKeyDown() {
    console.log('Key Down...', this.title);
  }
}
