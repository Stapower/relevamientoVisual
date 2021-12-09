import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoFoto'
})
export class TipoFotoPipe implements PipeTransform {

  transform(tipoFoto) {
    //cosasLindas
    //cosasFeas
    if(tipoFoto == "cosasLindas")
      return "linda";
    else
      return "fea";

    

    
  }

}
