import { Component, Input, OnInit } from '@angular/core';
import { TableTypeEnum } from '../../common/enums';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() tableType: TableTypeEnum;
  @Input() dataSource: Array<any>;
  @Input() columns: Array<{ dataType: string; dataField: string }>;
  @Input() buttonsTemplate: any;

  showPageSizeSelector = true;
  showNavButtons = true;

  constructor() {}
  ngOnInit() {}

  onExporting(event: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: event.component,
      indent: 5,
    }).then(() => {
      doc.save(`${this.tableType}.pdf`);
    });
  }
}
