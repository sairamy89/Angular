import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
    /*transform(value: any[], term: string): any[] {
        return value.filter((x: any) => x.name.toLowerCase().startwith(term.toLowerCase()) ||
        x.id.toLowerCase().startwith(term.toLowerCase()));
    }*/
    transform(items: any[], filter: any): any[] {
        if (!filter) {
            return items;
        }
        return items.filter(item => item.id.toLowerCase().includes(filter.toLowerCase()) ||
                                    item.name.toLowerCase().includes(filter.toLowerCase()));
    }
}
