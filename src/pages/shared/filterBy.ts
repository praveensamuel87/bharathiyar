import { Pipe, PipeTransform } from '@angular/core';
/*
 * Example use
 *    Basic Array of single type: *ngFor="#todo of todoService.todos | filterBy : '-'"
 *    Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | filterBy : ['-status']"
 *    Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | filterBy : ['status', '-title']"
 */

// TODO: Manas -> update code to handle multiple sorting logic for claims

//istanbul ignore next
@Pipe({ name: 'filterBy', pure: false })
export class CustomfilterBy implements PipeTransform {

    transform(items: any[], args: any[]): any {
        return items.filter(item => ((item.songName.toLowerCase().indexOf(args[0].toLowerCase()) !== -1) || item.songText.toLowerCase().indexOf(args[0].toLowerCase()) !== -1));
    }
}

