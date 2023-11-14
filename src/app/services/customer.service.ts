import { Injectable, OnInit } from '@angular/core';
import { UserDto } from '../Components/login/login.component';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http' ;
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnInit {
  ngOnInit(): void { 
    throw new Error('Method not implemented.'); 
  } 
 
  constructor(private httpclient:HttpClient) {} 
 private serverUrl:string='https://localhost:7057'
 
 public getUsers():Observable<UserDto[]>{ 
  let url=`${this.serverUrl}/api/UsersController`; 
  return this.httpclient.get<UserDto[]>(url).pipe(catchError(this.handleError)) 
  }
  public sendRegister(data:User):Observable<User>{ 
    // console.log('Request Payload:', data); 
    let dataUrl=`${this.serverUrl}/api/UsersController/Register` 
    return this.httpclient.post<User>(dataUrl,data) 
  }
public handleError(error:HttpErrorResponse){ 
  let errorMessage:string=''; 
  if(error.error instanceof ErrorEvent){ 
    //client error 
    errorMessage=`Error :${error.error.message};` 
  } 
  else{ 
    //server error 
    errorMessage=`Status :${error.status};` 
  } 
  return throwError(errorMessage); 
}

}
