import { Observable } from "rxjs";

export class Post {
    id: BigInteger;
    username: string;
    body: string;
    town: string;
    subject: string;
    likes: BigInteger;
    comments: BigInteger;
    //interestUser: boolean;
    //interests: Observable<Interest[]>;
}
