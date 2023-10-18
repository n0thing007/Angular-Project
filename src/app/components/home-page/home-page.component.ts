import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomePageComponent implements OnInit {
 logo:string="../../../assets/images/grocery.jpg";
 images = [
    '../../../assets/images/banner2.jpeg',
    '../../../assets/images/banner1.jpeg',
    '../../../assets/images/banner3a.jpg'
];

  constructor(
    config: NgbCarouselConfig,
    private route: Router
  ) {
    config.interval = 4000;//millisecond
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

  gotoLogin(): void {
    this.route.navigate(['/client-login'])//redirect it into client-login url
  }

}
