import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url:string = "http://localhost:3000/";

  private users:User[] = [
    {id:1,username:"nana"},
    {id:2,username:"jingjing"},
    {id:3,username:"nana123"}
  ];

  constructor(private http:HttpClient) { }

  getUsers(term:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?username=${term}`);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.url,user,{
      headers: new HttpHeaders({'Content-Type':'application/json'})
      //withCredentials: true
    });
  }

  delUser(user:User): Observable<any> {
    return this.http.delete(`${this.url}${user.id}`);
  }

  login(user:User): Observable<any> {
    return this.http.post(`${this.url}login`,user,{
      headers: new HttpHeaders({'Content-Type':'application/json'})
      //withCredentials: true
    });
  }

  exist(username:string): Observable<any>{
    return this.http.get(`${this.url}exist?username=${username}`);
  }
}
