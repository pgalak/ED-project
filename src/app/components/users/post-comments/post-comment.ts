import { UserComment } from '../../../models/user-comment';
import { UserPost } from '../../../models/user-post';

export class PostAndCommentsPage {
  constructor(public post: UserPost, public comments: UserComment[]) { }
}
