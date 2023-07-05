import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserRole, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  showCreatBtn: boolean = true;

  roles = UserRole;

  constructor(
    private router: Router,
    public userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        this.showCreatBtn = url.search('/article/') === -1;
        this.cd.detectChanges();
      }
    });
  }
}
