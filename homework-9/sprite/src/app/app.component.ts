import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public spriteUrl: string = "http://fe.it-academy.by/Examples/cards2.png";
    public offsetX: number = 0;
    public offsetY: number = 0;
    public width: number = 143.5;
    public height: number = 193.7;

    getSpriteUrl(): string {
        return this.spriteUrl;
    }

    getOffsetX(): number {
        return this.offsetX;
    }

    getOffsetY(): number {
        return this.offsetY;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    changeData(getBoundingClientRect:{width:number, height:number}):void {
        this.offsetX -= getBoundingClientRect.width;
        this.offsetY -= getBoundingClientRect.height;
    }
}
