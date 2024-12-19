import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';

  constructor(private router: Router) {}

  onRecover() {
    // Aquí puedes implementar la lógica de recuperación de contraseña
    if (this.validateEmail(this.email)) {
      console.log('Recuperar contraseña para:', this.email);
      // Simulando el envío del correo de recuperación
      alert('Se ha enviado un correo de recuperación a ' + this.email);
      
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    } else {
      console.log('Email no válido');
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
      alert('Por favor, introduce un correo electrónico válido.');
    }
  }

  validateEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
