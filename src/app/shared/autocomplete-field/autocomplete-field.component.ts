import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { filterOptions } from '../filter-options';

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [
    NgIf, NgFor, AsyncPipe, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  ],
  templateUrl: './autocomplete-field.component.html',
  styleUrl: './autocomplete-field.component.css',
})
export class AutocompleteFieldComponent implements OnInit, OnChanges {
  @Input() number?: number;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: string[];

  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.setupFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].firstChange) {
      this.setupFilter();
    }
  }

  private setupFilter(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(this.control.value ?? ''),
      map(value => filterOptions(this.options, value ?? '')),
    );
  }
}
