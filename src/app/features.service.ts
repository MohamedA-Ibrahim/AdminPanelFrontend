import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Features {
  enableGrpc: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private readonly apiUrl = environment.apiUrl;
  private readonly featuresSubject = new BehaviorSubject<Features | null>(null);
  features$ = this.featuresSubject.asObservable();
  private readonly http = inject(HttpClient);

  fetchFeatures(): Observable<Features> {
    return this.http.get<Features>(`${this.apiUrl}/features`);
  }

  setFeatures(features: Features) {
    this.featuresSubject.next(features);
  }

  getFeatures(): Features | null {
    return this.featuresSubject.getValue();
  }
}