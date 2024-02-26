import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Skill } from '@modules/dashboard/interfaces/skill';

// TODO: Replace this with your own data model type
export interface SkillsTableItem {
  id: number;
  name: string;
  icon: string;
}

/**
 * Data source for the SkillsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SkillsTableDataSource extends DataSource<SkillsTableItem> {
  data: SkillsTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  data$: BehaviorSubject<SkillsTableItem[]> = new BehaviorSubject(this.data);

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SkillsTableItem[]> {
    return this.data$.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.data$.complete();
  }

  setSkills(skills: any[]) {
    this.data = skills;
    this.data$.next(this.data);
  }

  addSkill(skill: Skill) {
    this.data.push(skill);
    this.data$.next(this.data);
  }

  replaceSkillByIndex(skill: Skill, index: number) {
    this.data.splice(index, 1, skill);
    this.data$.next(this.data);
  }

  deleteSkillByIndex(index: number) {
    this.data.splice(index, 1);
    this.data$.next(this.data);
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SkillsTableItem[]): SkillsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SkillsTableItem[]): SkillsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean,
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
