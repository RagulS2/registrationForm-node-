import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  token:string = '';

  constructor(private aRoute:ActivatedRoute,private apiSerice:ServiceService) {
    aRoute.params.subscribe(params=>{ 
      console.log(params);
      this.token = params?.['token'];
    });
   }

  ngOnInit() {
    this.apiSerice.verifyToken(this.token).subscribe(data=>{
      console.log(data);
    });

  }

}
