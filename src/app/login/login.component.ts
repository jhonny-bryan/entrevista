import { Component, OnInit } from '@angular/core';
import {  Validators , FormControl, FormGroup  } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import {  Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm=new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  constructor(
    private authService: AuthService,   
   
  private router: Router
    ) {}



  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if (username !== null && username !== undefined && password !== null && password !== undefined) {

        this.authService.login(username, password).subscribe(
        (response) => {
          // Manejar la respuesta del servidor aquí, por ejemplo, redirigir al dashboard
          console.log("ingreso");
          this.router.navigate(['/dashboard']);
         
        },
        (error) => {
          // Manejar errores de autenticación aquí
          console.log("no ingreso ")
        }
      );


      }  
    } else {
      console.log("los campos estan vacios")
      // Manejar formulario no válido aquí
    }
  }
  
}
