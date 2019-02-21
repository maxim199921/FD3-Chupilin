import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "transformToText",
    pure: true
})

export class NumwordPipe implements PipeTransform {

    transform(number:number, word1:string, word2:string, word3:string){
        let dd=number%100;
        if (number === null)
            return '';
        if ( (dd>=11) && (dd<=19) )
            return word3;
        let d=number%10;
        if ( d==1 )
            return word1;
        if ( (d>=2) && (d<=4) )
            return word2;
        return word3;
    }

}