import Context from './Context';
import ResolverMap from './ResolverMap';

const Query: ResolverMap = {
  currentUser (root: any, args: any, context: Context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    return context.user
  }
}
export default Query
