import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pedidos: any[] = []; // Aquí se almacenarán los pedidos
  nuevoPedido = { modelo: '', direccion: '', tiempo: '', costo: 0, descripcion: '' }; // Pedido nuevo
  nombreUsuario: string = '';

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.getPedidos(); // Cargar los pedidos al iniciar
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
  }

  // Método para obtener los pedidos
  getPedidos() {
    this.pedidosService.getPedidos().subscribe(
      (data) => {
        this.pedidos = data; // Guardamos los pedidos en la variable
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  // Método para agregar un nuevo pedido
  agregarPedido() {
    if (this.nuevoPedido.modelo && this.nuevoPedido.direccion && this.nuevoPedido.tiempo && this.nuevoPedido.costo && this.nuevoPedido.descripcion) {
      this.pedidosService.createPedido(this.nuevoPedido).subscribe(
        (pedido) => {
          this.pedidos.push(pedido); // Agregamos el nuevo pedido a la lista
          this.resetFormulario(); // Limpiar el formulario
        },
        (error) => {
          console.error('Error al agregar el pedido:', error);
        }
      );
    } else {
      console.error('Todos los campos son obligatorios');
    }
  }

  // Método para limpiar el formulario
  resetFormulario() {
    this.nuevoPedido = { modelo: '', direccion: '', tiempo: '', costo: 0, descripcion: '' };
  }
}
