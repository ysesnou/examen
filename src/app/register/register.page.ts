import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string='';
  correo: string='';
  contrasena: string='';
  confirmarContrasena: string='';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (this.contrasena === this.confirmarContrasena) {
      const user = {
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena,
      };
  
      console.log('Datos enviados:', user);  // Verificar los datos antes de enviarlos
  
      this.http.post('http://app-9b75c7bb-56ba-41c2-b61a-e95bb1807c38.cleverapps.io/api/usuarios', user).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']); // Redirigir al login
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          console.log('Detalles del error:', error.error);  // Verificar detalles del error
        }
      );
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
  
}
