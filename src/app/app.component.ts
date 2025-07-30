import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NotificationsComponent } from '@shared/components/notifications/notifications.component';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent, NotificationsComponent]
})
export class AppComponent {
  title = 'Berry Angular Free Version';
}
