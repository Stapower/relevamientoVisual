import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha2'
})
export class Fecha2Pipe implements PipeTransform {

  transform(fecha) {
    //cosasLindas
    //cosasFeas
    //nanoseconds: 949000000

    var nowDate = new Date();
    var nowSeconds = nowDate.getTime()/1000; 
    var timePassed = nowSeconds - fecha.seconds;
    var dateFromSecons = new Date(nowDate.getTime()-(timePassed*1000))
    
    console.log(dateFromSecons.toLocaleDateString());

    return dateFromSecons.toLocaleString();

  }
}
