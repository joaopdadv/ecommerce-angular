import { Component } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  animations: [
    trigger(
      'valueChanged',
      [
          transition('void => *', []),   // when the item is created
          transition('* => void', [      // when the item is removed
            animate(120, keyframes([ 
                style ({ opacity : 1 }),
                style ({ opacity : 0 }),
              ])),
          ]),
          transition('* => *', [         // when the item is changed
              animate(120, keyframes([   // animate for 120 ms
                style ({ opacity : 0 }),
                style ({ opacity : 1 }),
              ])),
          ]),
      ]),
  ]
})

export class TopMenuComponent {

  showSideMenu: boolean = false;

  toggleSideMenu(){
    this.showSideMenu = !this.showSideMenu;
  }
}
