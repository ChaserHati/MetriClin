import { Component, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-pdf-generator',
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css'
})
export class PdfGeneratorComponent {

  @ViewChild('chart', { static: false }) chartComponent: any; //esto se repite por cada grafico que se quiere incluir en el informe

  chartOptions = {
		title: {
			text: "Angular Column Chart with Index Labels"
		},
		animationEnabled: true,
		axisY: {
			includeZero: true
		},
		data: [{
			type: "column", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 71 },
				{ x: 60, y: 92, indexLabel: "Highest\u2191" },
				{ x: 70, y: 68 },
				{ x: 80, y: 38, indexLabel: "Lowest\u2193"  },
				{ x: 90, y: 54 },
				{ x: 100, y: 60 }
			]
		}]
	}

  private getCanvasImageDataURL(chartComponent: any): string | null {
    const canvas = chartComponent?.chart?.container?.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas not found in provided chart component.');
      return null;
    }
    return canvas.toDataURL('image/png');
  }

  generatePDF() {
    const doc = new jsPDF();
  
    // 1. Title
    doc.setFontSize(20);
    doc.text('Informe', 105, 20, { align: 'center' });
  
    // 2. Indicadores Generales
    doc.setFontSize(14);
    doc.text('Indicadores Generales', 14, 35);
    autoTable(doc, {
      startY: 40,
      head: [['Indicador', 'Valor', 'Interpretación']],
      body: [
        ['Peso', '', ''],
        ['Talla', '', ''],
        ['IMC','',''],
      ]
    });
  
    let finalY = (doc as any).lastAutoTable.finalY + 10;
  
    // 3. Masa Muscular
    doc.text('Masa Muscular', 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Indicador', 'Valor', 'Interpretación']],
      body: [
        ['Masa Muscular (kg)', '', ''],
        ['Masa Muscular (%)', '', ''],
        // ...
      ]
    });
  
    finalY = (doc as any).lastAutoTable.finalY + 10;
  
    // 4. Masa Grasa
    doc.text('Masa Grasa', 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Indicador', 'Valor', 'Interpretación']],
      body: [
        ['Masa Grasa (kg)', '', ''],
        ['Masa Grasa (%)', '', ''],
        // ...
      ]
    });
  
    finalY = (doc as any).lastAutoTable.finalY + 10;
  
    // 5. Insert chart from CanvasJS
    setTimeout(() => {
      const chartImages = [
        this.getCanvasImageDataURL(this.chartComponent), // esto tambien se repite por cada grafico que se quiere incluir en el informe, con el nombre que se le pone en ViewChild
      ];
  
      for (const img of chartImages) {
        if (img) {
          doc.addImage(img, 'PNG', 10, finalY, 180, 100);
          finalY += 110;
        }
      }
  
      doc.save('informe-nutricional.pdf');
    }, 500);

  }
}
