import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from './_services/security.service';
import { ConfigurationService } from './_services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated: boolean = false;
  subscription: Subscription;
  errorReceived: boolean;
  testId: string

  constructor(private securityService: SecurityService, private configurationService: ConfigurationService) {
    this.authenticated = this.securityService.IsAuthorized;
  }

  ngOnInit() {
    console.log('app on init');
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.authenticated = res);

    //Get configuration from server environment variables:
    console.log('configuration');
    this.configurationService.load();

    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.authenticated = res;
      // this.userName = this.service.UserData.email;
    });

    if (window.location.hash) {
      this.securityService.AuthorizedCallback();
    }

    console.log('identity component, checking authorized' + this.securityService.IsAuthorized);
    this.authenticated = this.securityService.IsAuthorized;

    //if (this.authenticated) {
    //  if (this.service.UserData)
    //    this.userName = this.service.UserData.email;
    //}
  }

  logoutClicked(event: any) {
    event.preventDefault();
    console.log('Logout clicked');
    this.logout();
  }

  login() {
    this.securityService.Authorize();
  }

  logout() {
    //this.signalrService.stop();
    this.securityService.Logoff();
  }
}
