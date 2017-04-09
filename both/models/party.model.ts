/**
 * Created by supeng on 2017/4/8.
 */
import{ CollectionObject} from './collection-object.model'

export interface Party extends CollectionObject{
    name: string;
    description: string;
    location: string;
}