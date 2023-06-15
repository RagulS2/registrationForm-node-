import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit {
  constructor(private route:ActivatedRoute,private service:ServiceService) { }
  staff:any;
  ngOnInit(): void {
    let id:number=Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe((data)=>{
      this.staff=data;
      console.log(data);
    });
  }

}
