import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/login';
import { CustomerService } from 'src/app/services/customer.service';
export interface UserDto { 
  userId: bigint; 
  userName: string; 
  password: string; 
  roleName: string; 
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login:Login={} as Login; 
   
   
  public userdata:UserDto[]=[] as UserDto[]; 
  // @Output () todoAdd:EventEmitter<number>=new EventEmitter(); 
   public id:bigint|null=null; 
    
   constructor(private router:Router,private httpser :CustomerService){ 
     
   } 

   ngOnInit(): void { 
    this.httpser.getUsers().subscribe((data:any)=>{ 
      this.userdata=data 
    }) 
     
   } 
   onSubmit() { 
     if (this.login.role === "admin" && this.login.username === "123gk" && this.login.password === "12345") { 
       this.router.navigate(["/contacts/adminhome"]).then(); 
     } else { 
      // let userFound = false; 
       for (const udata of this.userdata) { 
         const foundUser = this.userdata.find( 
           (udata) => 
             this.login.role === udata.roleName && 
             this.login.username === udata.userName && 
             this.login.password === udata.password 
         ); 
      
         if (foundUser) { 
           console.log('User login successful:', foundUser); 
           this.id = foundUser.userId; 
           this.router.navigate([`/contacts/userhome/${this.id}`]).then(); 
         } else { 
           console.log('User not found'); 
           this.router.navigate(['/contacts/login']).then(); 
         } 
       } 
     } 
   }
}
