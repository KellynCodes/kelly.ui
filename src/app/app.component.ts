import { Component, OnInit, NgZone } from '@angular/core';
import { SignalRService } from './services/signalr/signalr.service';
import { Store } from '@ngrx/store';
import { AppState } from './state/app/app.state';
import { JwtService } from './services/utils/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private worker!: Worker;

  constructor(
    private signrService: SignalRService,
    private jwtService: JwtService
  ) {
  
  }

  ngOnInit(): void {
    this.jwtService.CheckUser();
    this.runWorker(100);
    this.signrService.startConnection();
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
  this.worker = new Worker(new URL('./worker/app.worker', import.meta.url));
  this.worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
    };
    const isGetUser: boolean = true;
    this.worker.postMessage(isGetUser);
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}

}
}
