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

    //const pageWidth = orientation === 'portrait' ? 595.28 : 842; // A4 width dynamically
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
      watermark: { text: 'LEADS', color: 'blue', opacity: 0.05, bold: true, italics: false },
      content: [
        {
          //alignment: 'justify',
          columns: [
            {
              image: this.getBase64Image(),
              width: 50,  // Adjust the width as necessary for your image size
              height: 50,  // Height of the image
              alignment: 'left',
              margin: [0, 10, 0, 40],
             // Space below the image to avoid overlap with content
            },
            {
              text: 'LeadSoft',  // Display current date
              alignment: 'center',  // Align date to the right
              fontSize: 16,
              width: '*',
              margin: [150, 20, 0, 30],  // Position the date anywhere on the page (adjust x and y)
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

}
