import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NamesService {
  private cached: Promise<string[]> | null = null;

  getNames(): Promise<string[]> {
    return (this.cached ??= import('./names.data').then(m => m.NAMES));
  }
}
