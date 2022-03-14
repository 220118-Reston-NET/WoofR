import { Component, OnInit } from '@angular/core';
import { PawfinderService } from './../services/pawfinder.service';
import { Users } from './../models/users.model';
import { ActivatedRoute} from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalComponent } from '../global/global.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userID:number = 0;
  userName:string | null = "so user selected";
  userDOB:Date = new Date;
  userBio:string = "no user selected";
  userSize:string = "no user selected";
  userBreed:string = "no user selected";

  show:boolean = true;


 userGroup= new FormGroup({
  userName: new FormControl(""),
  userPassword:new FormControl(""),
  userDBO: new FormControl(""),
  userBio:new FormControl(""),
  userBreed:new FormControl(""),
  userSize:new FormControl("")    
});

// Users:PawfinderApi;
  sizeOfUsersList:number = 0;

  constructor(private router:ActivatedRoute, private PawService:PawfinderService, public nav: NavbarService, private userService: UserService) {
  
  //   this.Users={ sprites: {
  //     back_default:"",
  //     back_shiny:"",
  //     front_default:"",
  //     front_shiny:""
  //   }};
  
  //       this.filteredListOfUser = [];
}

  ngOnInit(): void {
    this.nav.show();

    this.userService.getUserByUserName(GlobalComponent.loggedInUserName).subscribe(result => 

    {GlobalComponent.loggedInUserID = result.userID;

      let user:Users=
      {
        userID: result.userID,
        userName:result.userName,
        userPassword:"",
        userDBO: result.userDBO,
        userBio:result.userBio,
        userBreed:result.userBreed,
        userSize:result.userSize,
        userImg:""
      }
      
      this.userID = user.userID;
      this.userName = user.userName;
      this.userDOB = user.userDBO;
      this.userBio= user.userBio;
      this.userSize = user.userSize;
      this.userBreed = user.userBreed;

    });
    
    // this.userName = this.router.snapshot.paramMap.get("userName");
    // this.service.getAllUsers().subscribe(result=>{
    //   this.Users=result;
    // });
    //   this.service.getAllUsers().subscribe(result => {
    //         console.log(result);
    //         this.listOfUsers = result;
    //         this.filteredListOfUser = result;
    //          // result.forEach(Users=>Users.userName);
    //     });
    
  }

  updateUserInfo(p_userGroup:FormGroup){

    let user:Users=
    {
      userID: this.userID,
      userName:"",
      userPassword:"",
      userDBO: new Date,
      userBio:p_userGroup.get("userBio")?.value,
      userBreed:"",
      userSize:p_userGroup.get("userSize")?.value,
      userImg:""
    }
    
    this.userService.updateUser(user).subscribe();

  }

}
