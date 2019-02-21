import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public number: number = null;
    public mess: string = null;

    showMessage(form:NgForm) {
        let message:number = form.value.message;
        if ( form.valid) {
            this.number = message;
            this.mess = 'У вас';
        }
    }
}
