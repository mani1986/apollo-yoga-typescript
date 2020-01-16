import Context from './Context';
import ResolverMap from './ResolverMap';

const Query: ResolverMap = {
  HelloWorld (root: any, args: any, context: Context) {
    return { response: 'Hi' }
  }
}
export default Query
