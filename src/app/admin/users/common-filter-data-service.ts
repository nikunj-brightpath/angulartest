import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable()
export class CommonFilterDataService {

    constructor() {

    }

    private filter: any = {
        roles: [],
        startDate: undefined,
        endDate: undefined
    };

    get() {
        return _.cloneDeep(this.filter);
    }

    set(filter: any) {
        this.filter = _.cloneDeep(filter);
    }


}