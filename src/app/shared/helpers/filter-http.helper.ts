import { Model } from 'tsmodels';

export class FilterHttpHelper {
  public static getQueryStrByFilter(filter: Model): string {
    let str = '?';

    if (filter && '_toJSON' in filter) {
      const obj = filter._toJSON() as Object;

      for (const key in obj) {
        if (obj.hasOwnProperty(key) && !obj[key]) {
          delete(obj[key]);
        }
      }

      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          (<Array<string>>obj[key]).forEach(id => {
            str += key + '[]=' + id + '&';
          });
        } else {
          str += key + '=' + obj[key] + '&';
        }
      });
    }

    return str.slice(0, -1);
  }
}
