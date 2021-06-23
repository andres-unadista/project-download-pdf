import { Component } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import breakingBad from './fake_data.json';
import { ICardItem } from 'cards';
import { breakingItem } from './interfaces/breakingBadItem';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-pdf';
  breakingBadData = breakingBad;
  cardsData: ICardItem[] = [];
  loadData: boolean = false;

  constructor() {
    this.breakingBadData.forEach((item: breakingItem) => {
      const card: ICardItem = {
        description: `${item.nickname}: ${item.occupation}`,
        name: item.name,
        img: item.img,
        ref: '#',
      };
      this.cardsData.push(card);
    });
  }

  public downloadPDF(): void {
    this.loadData = true;
     // Extraemos el
     const DATA = <HTMLElement> document.getElementById('htmlData');
     const doc = new jsPDF('p', 'pt', 'a4');
     const options = {
       background: 'white',
       scale: 3,
       logging: true,
       letterRendering: true,
       useCORS: true
     };
     html2canvas(DATA, options).then((canvas) => {

       const img = canvas.toDataURL('image/PNG');

       // Add image Canvas to PDF
       const bufferX = 15;
       const bufferY = 15;
       const imgProps = (doc as any).getImageProperties(img);
       const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
       return doc;
     }).then((docResult) => {
       this.loadData = false;
       docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
     });
  }
}
