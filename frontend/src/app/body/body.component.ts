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
        event.date = this.getDate(event.date);
        event.distanceKm = this.getDistance(event.distanceKm);
        event.weather = this.getWeather(event.weather);
        event.imgUrl =
          'https://lh3.googleusercontent.com/d/' + event.imgUrl.split('/')[5];
        return event;
      });
    });
  }

  getDate(dateString: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
  }

  getDistance(distanceAsString: string): string {
    const distanceInMeters = parseFloat(distanceAsString);
    const distanceInKilometers = distanceInMeters / 1000;
    return distanceInKilometers.toFixed(1) + ' Km';
  }

  getWeather(weatherString: string): string {
    const [weatherType, temperature] = weatherString.split(' ');
    const temperatureWithSymbol = `${temperature}\u00B0C`;
    return `${weatherType}, ${temperatureWithSymbol} | `;
  }

  appendData = () => {
    this.fetch.recommended().subscribe({
      next: (res) => {
        const temp = res.events.map((event: any) => {
          event.date = this.getDate(event.date);
          event.distanceKm = this.getDistance(event.distanceKm);
          event.weather = this.getWeather(event.weather);
          event.imgUrl =
            'https://lh3.googleusercontent.com/d/' + event.imgUrl.split('/')[5];
          return event;
        });
        this.recommended = [...this.recommended, ...temp];
      },
    });
  };

  onScroll() {
    this.appendData();
  }
}
