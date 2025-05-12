import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './pre.module'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  profiles!: Profile[]

  

  aggiungiDati(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, data: HTMLInputElement, ora: HTMLInputElement) {
    const dataValue = new Date(data.value);
    this.profiles.push(new Profile(nome.value, cognome.value, indirizzo.value, parseInt(telefono.value), email.value, dataValue, parseFloat(ora.value)))
  }
}
