import { Observable } from "rxjs";
import { Interest } from "./Interest";

export class Post {
    id: BigInteger;
    username: string;
    body: string;
    town: string;
    subject: string;
    interests: BigInteger;
    interestUser: boolean;
    //interests: Observable<Interest[]>;
}
