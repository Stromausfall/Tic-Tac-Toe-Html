export interface Player {
    tileClicked(x:number, y:number):void;
    isTurnFinished():boolean;
    startTurn():void;
}
