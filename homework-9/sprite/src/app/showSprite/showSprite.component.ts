import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'show-sprite',
  templateUrl: './showSprite.component.html',
  styleUrls: ['./showSprite.component.css']
})
export class ShowSpriteComponent {

    @Input("get-height")
    public height:number;

    @Input("get-width")
    public width:number;

    @Input("get-offsetX")
    public offsetX:number;

    @Input("get-offsetY")
    public offsetY:number;

    @Input("get-url")
    public spriteUrl:string;

    @Output("change-sprite")
    public changeSprite:EventEmitter<{width:number, height:number}>=new EventEmitter<{width:number, height:number}>();

}
