import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent {

  @Input() columns: any[] = [{ tag: 'id', name: 'ID' }, { tag: 'title', name: 'Title' }];
  @Input() items: any[] = [];

}
