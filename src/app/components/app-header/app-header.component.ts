import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  url: string = '/';
  constructor(
    private route: Router
  ) { }


  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationStart)//it used to update url with current url
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  gotourl(url: string): void {
    this.route.navigate(["/"+url]);// when u click on home/about/client/admin/contact it will navigate to that url
  }

}
