import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http:HttpClient) { }
  getAll(){
    const url='http://localhost:3000/allStaff';
    return this.http.get(url)
  }
  createUser(body:any){
    const url='http://localhost:3000/add'
    return this.http.post(url,body)
  }
  getById(id:number){
    const url='http://localhost:3000/getId/'
    return this.http.get(url+id)

  }
  updateUser(body:any){
    const url='http://localhost:3000/updatestaff'
    return this.http.put(url,body)

  }
  deleteUser(deleteID:number){
    const url='http://localhost:3000/deletestaff'
    return this.http.put(url,{id:deleteID})
  }
login(body:any){
  const url='http://localhost:3000/verify'
  return this.http.post(url,body)
  
}
  adduser(body:any){
    const url='http://localhost:3000/register'
    return this.http.post(url,body)
  }

  verifyToken(token:string){ 
    const url='http://localhost:3000/verifyToken'
    return this.http.post(url,{token:token})
  }
}
