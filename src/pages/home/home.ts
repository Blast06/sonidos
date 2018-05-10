import { Animal } from './../../interfaces/animal.interface';
import { ANIMALES } from './../../data/data.animales';
import { Component } from '@angular/core';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: number;
  ordenando:boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0); //crea un clon del objeto animales



  }

  reproducir(animal: Animal) {
    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;

    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();


    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);

  }

  private pausar_audio(animalSel: Animal) {
    clearTimeout(this.audioTiempo)

    this.audio.pause();
    this.audio.currentTime = 0;


    // esto es para poner en falso todos los animales que se estarian reproduiendo pero que no son 
    // el que el usuario selecciono

    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;

      }

    }


  }
  borrar_animal(idx: number) {
    this.animales.splice(idx,1);

  }

  recargar_animales(refresher:Refresher){
    console.log("inicio del refresh");

    setTimeout(() => {
      console.log("termino el refresh");

      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenar_animales( indices:any){

    //esto es para reordenar la lista cuando se selecciona un item y se mueve a X sitio
    this.animales = reorderArray(this.animales, indices);
  }


}
