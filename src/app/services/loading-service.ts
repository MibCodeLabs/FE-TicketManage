import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal(false);
  displayText = signal('');
  activeRequests = 0;

  setLoading(state: boolean) {
    this.loading.set(state);
  }
  setDisplayText(message: string) {
    this.displayText.set(message);
  }
  clearMessage() {
    this.setDisplayText('');
  }

  startRequest(): void {
    this.activeRequests++;
    this.loading.set(true);
  }

  endRequest(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.loading.set(this.activeRequests > 0);
  }
}
