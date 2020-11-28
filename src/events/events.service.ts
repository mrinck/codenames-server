import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
    handleMessage(msg: any) {
        switch (msg.type) {
            case 'identify':
                console.log('identified: ', msg.codename);
                break;
            default:
                console.log('unhandled: ', msg);
        }
    }
}
