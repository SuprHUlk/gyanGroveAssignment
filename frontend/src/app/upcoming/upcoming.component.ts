import { Component } from '@angular/core';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
})
export class UpcomingComponent {
  constructor(private fetch: FetchService) {}

  upcoming: any;

  ngOnInit(): void {
    this.fetch.upcoming().subscribe((res: any) => {
      this.upcoming = res.events.map((event: any) => {
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
    this.fetch.upcoming().subscribe({
      next: (res) => {
        const temp = res.events.map((event: any) => {
          event.date = this.getDate(event.date);
          event.distanceKm = this.getDistance(event.distanceKm);
          event.weather = this.getWeather(event.weather);
          event.imgUrl =
            'https://lh3.googleusercontent.com/d/' + event.imgUrl.split('/')[5];
          return event;
        });
        this.upcoming = [...this.upcoming, ...temp];
      },
    });
  };

  onScroll() {
    this.appendData();
  }
}
