import * as Collections from 'typescript-collections';

export class Observable {
    private _toNotify:Collections.Set<Function> = new Collections.Set<Function>();

    addObserver(toNotify:Function) {
        this._toNotify.add(toNotify)
    }

    removeObserver(toNotify:Function) {
        this._toNotify.remove(toNotify)
    }

    notify() {
        this._toNotify.forEach(
            (element) => {
                element();
            }
        )
    }

    clearObservers() {
        this._toNotify.clear();
    }
}
