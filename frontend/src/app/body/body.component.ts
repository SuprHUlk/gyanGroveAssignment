import { Component } from '@angular/core';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  constructor(private fetch: FetchService) {}

  recommended: any;

  ngOnInit(): void {
    this.fetch.recommended().subscribe((res: any) => {
      this.recommended = res.events.map((event: any) => {
        const id = event.imgUrl.split('/')[5];
        event.imgUrl = 'https://lh3.googleusercontent.com/d/' + id;
        return event;
      });
    });
  }
}
