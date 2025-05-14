import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile, Response } from './pre.module'
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
  profiles!: Profile[]
  nuovidati! : Profile;
  obsPost = new Observable<Response>;
  yippie! : Observable<Profile[]>;

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

  

  aggiungiDati(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, data: HTMLInputElement, ora: HTMLInputElement) {
    const dataValue = new Date(data.value);
    this.loading = true;
   

    this.nuovidati = new Profile (nome.value, cognome.value, indirizzo.value, Number(telefono.value), email.value, dataValue , Number(ora.value));
    console.log( JSON.stringify(this.nuovidati))
    this.obsPost = this.http.post<Response>('https://my-json-server.typicode.com/QuckquackMF/http/prenotazioni', JSON.stringify(this.nuovidati));
      
    this.obsPost.subscribe(this.faicose);
  }

  faicose = (data :Response) => {
    this.data = data;
    this.loading = false;
    console.log(data)

    if(data.id > 0 )
    {
      this.profiles.push(this.nuovidati);
    }

  }

  makeTypedRequest() {
    this.yippie = this.http.get<Profile[]>('https://jsonplaceholder.typicode.com/posts');
    this.yippie.subscribe(data => {this.profiles = data;});
  }

  ngOnInit() {
    this.makeRequest()
  }

}
