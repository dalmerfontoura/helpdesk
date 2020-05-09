import { User } from './user.model';

export class Ticket {
    constructor(
        public id: string,
        public numbers: number,
        public title: string,
        public status: string,
        public priority: string,
        public image: string,
        public user: User,
        public assinedUser: User,
        public date: Date,
        public changes: Array<string>
    ) {

    }
}
