export interface ObservableElement {
    addObserver(toNotify:Function) : void;
    removeObserver(toNotify:Function) : void;
}
