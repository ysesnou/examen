import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://app-9b75c7bb-56ba-41c2-b61a-e95bb1807c38.cleverapps.io/api/pedidos'; // Cambia esta URL si tu API tiene otra ruta

  constructor(private http: HttpClient) {}

  // Obtener todos los pedidos
  getPedidos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un nuevo pedido
  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
}
