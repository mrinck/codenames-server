export interface Card {
    codename: string;
    identified: boolean;
    identity: {
        type: 'red' | 'blue' | 'bystander' | 'assassin';
        gender?: 'female' | 'male';
    }
}