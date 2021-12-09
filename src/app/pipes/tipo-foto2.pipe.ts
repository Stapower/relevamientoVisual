import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoFoto2'
})
export class TipoFoto2Pipe implements PipeTransform {

  transform(tipoFoto) {
    //cosasLindas
    //cosasFeas
    if(tipoFoto == "cosasLindas")
      return "linda";
    else
      return "fea";

    

    
  }

}
