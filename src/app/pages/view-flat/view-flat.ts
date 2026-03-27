import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatService } from '../../flatservice';
import { AuthService } from '../../services/auth';
import { Flat } from '../../Models/flat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-flat.html',
})
export class FlatViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flatService = inject(FlatService);
  private authService = inject(AuthService);

  flat: Flat | null = null;
  isOwner = false;
  currentUserId: string | null = null;

  ngOnInit() {
    const flatId = this.route.snapshot.paramMap.get('id');
    if (!flatId) return;

    this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user?.uid || null;
    });

    this.flatService.getFlatById(flatId).subscribe(flat => {
      if (flat) {
        this.flat = flat;
        this.isOwner = flat.ownerId === this.currentUserId;
      }
    });
  }

  editFlat() {
    if (this.flat?.id) {
      this.router.navigate(['/edit-flat', this.flat.id]);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}