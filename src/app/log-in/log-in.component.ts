import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
interface Data{
  username:string,
  password:string
}
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
 body:Data={ 
    username:'',
    password:''
 }
 list:any;
  constructor(private service:ServiceService,private router:Router) { }
  login(){
    this.service.login(this.body).subscribe((data)=>{
      this.list=data;
      console.log(this.list);
      
      if(this.list.length==1){
        console.log('login success');
        alert('login success');
        this.nextpage();


      } 
      else{
        console.log('login fail');
        alert('login fail');
      }

      console.log(data);
    })


  }

  nextpage(){
    this.router.navigate(['form']);
  }

  create(){
    this.service.adduser(this.body).subscribe()
    console.log(this.body);
  }
}
