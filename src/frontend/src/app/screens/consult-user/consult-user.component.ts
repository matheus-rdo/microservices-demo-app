import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.css']
})
export class ConsultUserComponent implements OnInit {

  cpf;
  balancoFinanceiro = null;

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
    this.appService.consultarBalancoFinanceiro(this.cpf).subscribe((balanco) => this.balancoFinanceiro = balanco)

  }

}
