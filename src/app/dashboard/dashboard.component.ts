import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public users:any = [];
  public fullName : string = "";
  public role : string = "";

  constructor(private auth : AuthService, private api : ApiService, private userStore : UserStoreService){}

  ngOnInit(): void {
    this.loadUsers();
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.userStore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    })
  }
  loadUsers(): void {
    this.api.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout(){
    this.auth.signOut();
  }
}
