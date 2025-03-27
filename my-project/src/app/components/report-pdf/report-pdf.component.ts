import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = pdfFonts.vfs;

@Component({
  selector: 'app-report-pdf',
  imports: [CommonModule],
  templateUrl: './report-pdf.component.html',
  styleUrl: './report-pdf.component.css',
  providers: [LocalStorageService]
})
export class ReportPDFComponent implements OnInit{

  employeeInfoList: any[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    //this.employeeInfoList = JSON.parse(this.localStorageService.getData('employeeswithInfo') || []);
    const data = this.localStorageService.getData('employeeswithInfo');

    if (typeof data === 'string') {
      this.employeeInfoList = JSON.parse(data);
    } else {
      this.employeeInfoList = data || [];
    }

  }
  createPDF(orientation: 'portrait' | 'landscape' = 'portrait') {
    console.log("hit");
    console.log("", this.employeeInfoList);

    const pageWidth = orientation === 'portrait' ? 595.28 : 842; // A4 width dynamically
    //const imageHeight = 72;
    //const margins = 72; // Left and right margins
    const lastEmployee = this.employeeInfoList.length > 0 ? this.employeeInfoList[this.employeeInfoList.length - 1] : { emplId: 'N/A', employeeName: 'N/A' };

    const tableBody: any = [
      [
        { text: 'SL', style: 'tableHeader', margin: [0, 5, 0, 5], fontSize: 13, bold:true ,alignment: 'center' },
        { text: 'Employee ID', style: 'tableHeader', margin: [0, 5, 0, 5],fontSize: 13 , bold:true, alignment: 'center' },
        { text: 'Employee Name', style: 'tableHeader', margin: [0, 5, 0, 5],fontSize: 13, bold:true , alignment: 'center'},
        { text: 'Employee Designation', style: 'tableHeader', margin: [0, 5, 0, 5], fontSize: 13, bold:true, alignment: 'center' },
      ],
      ...this.employeeInfoList.map((emp, index) => [
        { text: (index + 1).toString(), fontSize: 12 },
        { text: emp.emplId, fontSize: 12 },
        { text: emp.employeeName, fontSize: 12 },
        { text: emp.employeeDesignation, fontSize: 12 },
      ])
    ];

    const tableBody2: any = [
      [
        { text: 'Stub (Row heading)', rowSpan: 3, bold: true },
        { text: 'Caption (Column heading)', colSpan: 3, alignment: 'center', bold: true },
        '',
        '',
        { text: 'Total (Rows)', rowSpan: 3, alignment: 'center', bold: true }
      ],
      [
        '',
        { text: 'Subheading', colSpan: 2, alignment: 'center', bold: true },
        '',
        { text: 'Subheading', alignment: 'center', bold: true },
        ''
      ],
      [
        '',
        { text: 'Column heading', alignment: 'center' },
        { text: 'Column heading', alignment: 'center' },
        { text: 'Column heading', alignment: 'center' },
        { text: 'Column heading', alignment: 'center' }
      ],
      // Employee data rows dynamically
      ...this.employeeInfoList.map((emp, index) => [
        { text: `Employee ${index + 1}`, bold: true },
        { text: emp.emplId, alignment: 'center' },
        { text: emp.employeeName, alignment: 'center' },
        { text: emp.employeeDesignation, alignment: 'center' },
        { text: 'N/A', alignment: 'center' } // Placeholder for total row
      ]),
      // Total Row
      [
        { text: 'Total (Columns)', bold: true },
        { text: '', colSpan: 4 } // Empty total row
      ]
    ];

    const documentDefinition: any = {
      pageSize: 'A4',
      pageOrientation: orientation,
      pageMargins: [72, 77, 36, 36], //here 1 inch = 72 points , why top 77 becuse for gap 72 (gap 5)

      header: (currentPage: number, pageCount: number) => {
        return [
          // Image stretched to full width, centered on the page

          {
            image: this.getBase64Image(),
            width: 850,  // Adjust the width as necessary for your image size
            height: 72,  // Height of the image
            alignment: 'center',
            margin: [0, 0, 0, 20],
           // Space below the image to avoid overlap with content
          },

        ];
      },

      // footer: (currentPage: number, pageCount: number) => {
      //   return {
      //     text: `Page ${currentPage} of ${pageCount}`,
      //     alignment: 'right',
      //     fontSize: 10,
      //     margin: [0, 0, 40, 10]
      //   };
      // },
      footer: (currentPage: number, pageCount: number) => {
        return {
          columns: [
              {
                  text: 'Leadsoft', // Replace with your actual company name
                  alignment: 'left',
                  fontSize: 10,
                  margin: [75, 0, 0, 10] // Left margin to push it inside the page
              },
              {
                  text: `Page ${currentPage} of ${pageCount}`,
                  alignment: 'right',
                  fontSize: 10,
                  margin: [0, 0, 40, 10] // Right margin
              }
          ]
        };
      },
      background: (currentPage: number, pageCount: number) => {
        const pageWidth = orientation === 'portrait' ? 595.28 : 841.89; // A4 width
        const pageHeight = orientation === 'portrait' ? 841.89 : 595.28; // A4 height
        const imageWidth = 320; // Image width
        const imageHeight = 80; // Image height
        const logoOpacity = 0.1; // Transparency

        return {
          image: this.getBase64ImageLogo(), // Your base64 image function
          width: imageWidth,
          height: imageHeight,
          opacity: logoOpacity,
          margin: [(pageWidth - imageWidth) / 2, (pageHeight - imageHeight) / 2, 0, 0], // Center image
          alignment: 'center'
        };
      },

      watermark: { text: 'LEADS', color: 'blue', opacity: 0.05, bold: true, italics: false },
      content: [
        {
          //alignment: 'justify',
          columns: [
            {
              image: this.getBase64ImageLogo(),
              width: 80,  // Adjust the width as necessary for your image size
              height: 20,  // Height of the image
              alignment: 'left',
              margin: [0, 20, 0, 40],
             // Space below the image to avoid overlap with content
            },
            {
              text: 'LeadSoft',  // Display current date
              alignment: 'center',  // Align date to the right
              fontSize: 16,
              width: '*',
              margin: [100, 20, 0, 30],  // Position the date anywhere on the page (adjust x and y)
            },
            {
              text: 'Date: ' + new Date().toLocaleDateString(),  // Display current date
              alignment: 'right',  // Align date to the right
              fontSize: 10,
              margin: [0, 20, 10, 30],  // Position the date anywhere on the page (adjust x and y)
            }
          ]
        },

        {
          alignment: 'justify',
          columns: [
            {
              width: '*',
              margin: [0, 0, 20, 0],
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
            },
            {
              width: '*',
              margin: [0, 0, 20, 0],
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
            }
          ]
        },
        {
          text: 'Employee Report',
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]
        },

        {
          text: 'Date: ' + new Date().toLocaleDateString(),  // Display current date
          alignment: 'right',  // Align date to the right
          fontSize: 10,
          margin: [0, 0, 10, 10],  // Position the date anywhere on the page (adjust x and y)
        },
        {
          text: 'This paragraph uses header style and extends the alignment property',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            'This paragraph uses header style and overrides bold value setting it back to false.\n',
            'Header style in this example sets alignment to justify, so this paragraph should be rendered \n',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
            ],
          style: 'header',
          bold: false
        },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '30%', '30%', '30%'], // Widths of the columns
            body: tableBody,
            margin: [0, 50, 0, 40],
          },
          //layout: 'lightHorizontalLines',
          layout: {
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => 'black',
            vLineColor: () => 'black',
          },
          margin: [0, 20, 0, 40], // Ensure spacing below header
          //pageBreak: 'before',
        },

        {
          text: 'Report End Here',
          fontSize: 18,
          bold: true,
          color: 'red',
          alignment: 'center',
          margin: [0, 30, 0, 0],
        },
        {
          text: 'This is absolute positioned text',
          //absolutePosition: { x: 220, y: 110 }, // X = 150px from left, Y = 100px from top
          margin: [0, 30, 0, 0],
          fontSize: 14,
          bold: true,
          alignment: 'center',
        },
        {
      text: 'Table Number: ........',
      fontSize: 12,
      bold: true,
      margin: [0, 0, 0, 5]
    },
    {
      text: 'Title: ........',
      fontSize: 12,
      bold: true,
      margin: [0, 0, 0, 5]
    },
    {
      text: '(Head note, if any)',
      fontSize: 10,
      italics: true,
      margin: [0, 0, 0, 10]
    },
    {
      table: {
        headerRows: 3, // Ensures top 3 rows repeat on new pages
        widths: ['20%', '20%', '20%', '20%', '20%'], // Adjust column widths
        body: tableBody2
      },
      layout: {
        hLineWidth: () => 1, // Horizontal line width
        vLineWidth: () => 1, // Vertical line width
        hLineColor: () => 'black',
        vLineColor: () => 'black'
      },
      margin: [0, 10, 0, 10] // Space before and after table
    },
    {
      text: `Source no: ${lastEmployee.emplId}`,
      fontSize: 10,
      margin: [0, 10, 0, 5]
    },
    {
      text: `Footnote: ${lastEmployee.employeeName}`,
      fontSize: 10
    }
      ]
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  getBase64Image(): string {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlMAAABICAIAAABdrefOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTAzLTI0PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjBjZjUzZjg4LWUxY2ItNGU2MS1hYjk3LTNjZjQyYTIxZjVlNzwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5Zb3VyIHBhcmFncmFwaCB0ZXh0IC0gMTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3Jp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'; // Replace with actual Base64 image
  }
  getBase64ImageLogo(): string {
    return 'data:image/png;base64,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';
  }
}
