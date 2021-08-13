import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getAllIndustry } from 'src/app/+store/action/industry.action';
import { selectGetAllIndustry, selectGetAllIndustryError } from 'src/app/+store/selectors/industry.selector';
import { Industry, Error } from 'src/app/models';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit {

  error?: Error;
  industryList: Industry[] | undefined;

  // SEARCH
  searchText = '';
  searchValue = new BehaviorSubject<any>(null);

  // PAGINATION
  itemsPerPage = 5;
  currentPage = 1;

  // PAGE
  pageLoaded = false;

  constructor(
    private store: Store<any>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setSearch();
    this.store.dispatch(getAllIndustry());
    this.allIndustrySelector();
  }


  allIndustrySelector(): void {
    this.pageLoaded = true;
    this.store.select(selectGetAllIndustry).subscribe(data => {
      this.industryList = data ?? undefined;
      if (this.industryList) {
        this.pageLoaded = false;
      }
    });

    this.store.select(selectGetAllIndustryError).subscribe(error => {
      if (error) {
        this.error = error;
        this.pageLoaded = false;
      }
    });
  }

  // Global Search
  setSearch(): void {
    this.searchValue.pipe(debounceTime(1000)).subscribe(data => {
      if (data != null) { }
    });
  }
  globalSearch(value: string): void {
    this.searchValue.next(value);
  }

  // Pagination
  pageChanged(event: number): void {
    this.currentPage = event;
  }

  changePerPageValue(page: number): void {
    if (page !== 0 && page !== null) {
      this.currentPage = 1;
    }
  }

}
