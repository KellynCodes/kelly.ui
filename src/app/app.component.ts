import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private worker!: Worker;
  public messageFromWorker!: string;

  constructor(private ngZone: NgZone) {
    console.log(import.meta.url);
  }

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new worker instance
      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        // Use NgZone to update view in Angular
        this.ngZone.run(() => {
          this.messageFromWorker = data;
        });
      };
    } else {
      // Web Workers are not supported in this environment
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  sendMessage(): void {
    this.worker.postMessage('Hello from app!');
  }
}

/*if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}*/
