export class Observable {
    private _toNotify:Function;

    addObserver(key:Object, toNotify:Function) {
        this._toNotify = toNotify;
    }

    notify() {
        this._toNotify();
    }
}
