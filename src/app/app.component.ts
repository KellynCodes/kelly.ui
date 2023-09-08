import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private worker!: Worker;
  public messageFromWorker!: string;

  constructor() {
  
  }

  ngOnInit(): void {
    this.runWorker(100);
   
  }

  sendMessage(data: any): void {
    this.worker.postMessage(data);
  }

   ngOnDestroy() {
    // Terminate the worker when the component is destroyed
    if (this.worker) {
      this.worker.terminate();
    }
  }

runWorker(data: any): void {
  if(typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./worker/app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
    };
    const isGetUser: boolean = true;
    worker.postMessage(isGetUser);
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}

}
}
