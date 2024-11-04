import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDisplayComponent } from './components/data-display/data-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataDisplayComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>HTTP Request Demo</h1>
      </header>
      <main>
        <app-data-display />
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }

    header {
      background: #2563eb;
      color: white;
      padding: 1rem;
      margin-bottom: 2rem;
    }

    header h1 {
      max-width: 800px;
      margin: 0 auto;
    }

    main {
      padding: 0 1rem;
    }
  `]
})
export class AppComponent {}