//file name: remove-spaces.ts
import { Pipe } from '@angular/core'

@Pipe({
    name: "pipeSelected",
    pure: false
})

export class PipeSelected {
    transform(items: any[]) {
        if (!items)
            return [];

        return items.filter(it => it.selected);
    }
}

