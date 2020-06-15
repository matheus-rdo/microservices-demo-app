import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listOfData = null;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUsuarios().subscribe(usuarios => this.listOfData = usuarios)
  }

}
