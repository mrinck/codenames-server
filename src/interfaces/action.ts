export interface Action {
    type: string;
}

export interface CreateAction extends Action {
    type: 'create';
}

export interface RevealAction extends Action {
    type: 'reveal';
    gameId: string;
    codename: string;
}