import { Component ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';
interface Data{
  id:number,
  Name:string,
  position:string,
  salary:number
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  staff:any;
  body:Data={
    id:0,
    Name:'',
    position:'',
   salary:0
  }
  isVisible:boolean=false;
  constructor(private service:ServiceService){}
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.getAll().subscribe((data)=>{
      this.staff=data;
      console.log(data);
      
    })
  }
  createUser(){
    this.service.createUser(this.body).subscribe()
    console.log(this.body);
    this.getAll();  
    this.resetForm();
  }
  edit(id:number){
    this.isVisible=true;
    this.service.getById(id).subscribe((data:any)=>{
      this.staff=data;
      console.log(data,'getbyId');
      this.body={
        id:data[0].id,
        Name:data[0].Name,
        position:data[0].position,
        salary:data[0].salary,
      }
      this.getAll();
    })
  }
  updateUser(){
    this.isVisible=false;
    this.service.updateUser(this.body).subscribe()
    console.log(this.body);
    this.getAll();
    this.resetForm();
    
  }
  deleteUser(id:number){
    this.service.deleteUser(id).subscribe()
    console.log(id,'deleted');
    this.getAll();
    
  }
  resetForm(){
    this.body={
      id:0,
      Name:'',
      position:'',
      salary:0
    }
  }
}
