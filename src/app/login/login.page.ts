import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  correo: string = '';   // Variables para el formulario de inicio de sesión
  contrasena: string = '';
  rolSeleccionado: string = ''; // Variable para guardar el rol seleccionado

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private popoverController: PopoverController // Para controlar el popover
  ) {}

  // Función para manejar el inicio de sesión
  async onLogin() {
    const credentials = {
      correo: this.correo,
      contrasena: this.contrasena,
    };

    this.http.post('http://app-9b75c7bb-56ba-41c2-b61a-e95bb1807c38.cleverapps.io/api/login', credentials).subscribe(
      async (response: any) => {
        console.log('Respuesta del servidor:', response);

        // Guardar el nombre del usuario en localStorage o en una variable
        localStorage.setItem('nombreUsuario', response.nombre);

        // Mostrar mensaje de bienvenida
        const alert = await this.alertController.create({
          header: 'Bienvenido',
          message: `¡Bienvenido, ${response.nombre}!`,
          buttons: ['OK'],
        });
        await alert.present();

        // Redirigir a la página de inicio o dashboard
        this.router.navigate(['/home']);
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  // Función para seleccionar el rol y cerrar el popover
  async selectRole(role: string) {
    this.rolSeleccionado = role; // Guardar el rol seleccionado
    const popover = await this.popoverController.getTop();
    if (popover) {
      popover.dismiss(); // Cerrar el popover
    }
    console.log(`Rol seleccionado: ${role}`);
  }
}
