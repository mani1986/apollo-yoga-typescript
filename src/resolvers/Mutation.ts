import Context from './Context';
import ResolverMap from './ResolverMap';

let val = 0

const Mutation: ResolverMap = {
  increment (root: any, args: any, context: Context) {
    val += 1

    return { response: val }
  }
}
export default Mutation
