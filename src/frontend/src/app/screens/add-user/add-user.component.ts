import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      remuneracao: [null, [Validators.required]],
    })
  }


  submitForm(): void {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.invalid) return

    this.appService.cadastrar(this.userForm.value).subscribe((val) => {
      this.message.create('success', `Usuário cadastrado com sucesso!`);
      this.router.navigate(['/'])
    }, (err) => {
      console.log('form error', err)
      this.message.create('error', `Ocorreu uma falha ao cadastrar usuário`);
    })

  }

}
