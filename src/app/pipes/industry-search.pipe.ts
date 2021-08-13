import { Pipe, PipeTransform } from '@angular/core';
import { Industry } from '../models';

@Pipe({
  name: 'industrySearch'
})
export class IndustrySearchPipe implements PipeTransform {

  transform(list: Industry[], searchText: string): Industry[] {
    if (list.length === 0) {
      return [];
    } else {
      if (searchText === null || searchText === '') {
        return list;
      }
      else {
        searchText = searchText.toLowerCase();
        const industryList = list.filter((data: Industry) => {
          return JSON.stringify(data.industryName).toLowerCase().includes(searchText);
        });
        if (industryList.length === 0) {
          return [new Industry(
            {
              isEmpty: true,
              industryName: 'No results for'
            }
          )];
        } else {
          return industryList;
        }
      }
    }
  }

}
