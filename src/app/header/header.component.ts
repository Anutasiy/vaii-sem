import {Component} from '@angular/core';
import {$} from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent {
  collapsed = true;
}

