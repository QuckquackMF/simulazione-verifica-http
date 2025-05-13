import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './pre.module'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data!: Object;
  loading: boolean=false;
  o! :Observable<Object>;
  constructor(public http: HttpClient) {}
  
  makeRequest(): void {
    this.loading = true;
    this.o = this.http.get('https://my-json-server.typicode.com/QuckquackMF/http/prenotazioni');
    this.o.subscribe(this.getData);
  }
  getData = (d : Object) =>
  {
    this.data = new Object(d);
    this.loading = false;
    console.log(this.data);
  }

  profiles!: Profile[]

  

  aggiungiDati(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, data: HTMLInputElement, ora: HTMLInputElement) {
    const dataValue = new Date(data.value);
    this.loading = true;
    this.http.post('https://my-json-server.typicode.com/QuckquackMF/http/prenotazioni',
        JSON.stringify({ 
          id: 28,
          nome: nome.value,
          cognome: cognome.value,
          indirizzo: indirizzo.value,
          telefono: telefono.value,
          email: email.value,
          data: data.value,
          ora: ora.value
        })
      )
      .subscribe(data => {
        this.data = data;
        this.loading = false;
      });
  }


  ngOnInit() {
    this.makeRequest()
  }

}
