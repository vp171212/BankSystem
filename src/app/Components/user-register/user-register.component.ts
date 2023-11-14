import { Component } from '@angular/core';
import { User } from 'src/app/Models/user';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  public userreg:User={} as User; 
  constructor(private https:CustomerService){} 
  onRegter(){ 
this.https.sendRegister(this.userreg).subscribe((data)=>{ 
  console.log(data) 
}) 
  }
}
