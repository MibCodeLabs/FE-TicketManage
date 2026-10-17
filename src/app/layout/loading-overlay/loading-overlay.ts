import { Component, computed, signal } from '@angular/core';
import { LoadingService } from '../../core/services/loading-service';

@Component({
  selector: 'app-loading-overlay',
  imports: [],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.css',
})
export class LoadingOverlay {
  constructor(private loadingService:LoadingService){}

  loading = computed(()=>{
    return this.loadingService.loading()
  });
  displayText = computed(()=>{
    return this.loadingService.displayText()
  });

}
