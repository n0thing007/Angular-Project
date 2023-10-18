import { Component, OnInit } from '@angular/core';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  userName: string = '';
  constructor(
    private gService: GrocessaryService
  ) {
    if (this.gService.getAdminName() !== null) {
      this.userName = this.gService.getAdminName();
    }
    this.gService.isAdminLoginPresent();
  }

  ngOnInit(): void {
  }

}
