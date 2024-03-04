import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'platform',
})
export class LoadingLayerService {

  private loading$: BehaviorSubject<boolean>;

  constructor() { 
    this.loading$ = new BehaviorSubject(false);
  }

  set loading(val: any) {
    this.loading$.next(val);
  }

  get loading() {
    return this.loading$;
  }
}
