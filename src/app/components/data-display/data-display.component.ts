import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Post } from '../../models/post.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      @if (error) {
        <div class="error">{{ error }}</div>
      }

      @if (loading) {
        <div class="loading">Loading posts...</div>
      }

      @if (posts.length) {
        <button (click)="sortData()" class="sort-btn">
          Sort {{ sortAscending ? '↓' : '↑' }}
        </button>
        
        <div class="posts">
          @for (post of posts; track post.id) {
            <div class="post">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .error {
      color: #dc2626;
      padding: 1rem;
      background: #fee2e2;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .sort-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    .sort-btn:hover {
      background: #2563eb;
    }

    .posts {
      display: grid;
      gap: 1rem;
    }

    .post {
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .post h3 {
      margin: 0 0 0.75rem 0;
      color: #1f2937;
      font-size: 1.25rem;
    }

    .post p {
      margin: 0;
      color: #4b5563;
      line-height: 1.5;
    }

    @media (max-width: 640px) {
      .container {
        padding: 1rem;
      }
      
      .post {
        padding: 1rem;
      }
    }
  `]
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  error = '';
  loading = true;
  sortAscending = true;
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchData() {
    this.loading = true;
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  sortData() {
    this.posts.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return this.sortAscending ? comparison : -comparison;
    });
    this.sortAscending = !this.sortAscending;
  }
}