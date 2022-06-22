//集中引入个个数据接口 一起暴露
//分别暴露加上*as   全部暴露直接命名就好
import * as attr from './product/attr';
import * as sku from './product/sku';
import * as tradeMark from './product/tradeMark';
import * as spu from './product/spu';

//对外暴露
import permission from './acl/permission';
import role from './acl/role';
import * as user from './acl/user';

//对外暴露
export default {
    attr,
    sku,
    spu,
    tradeMark,
    permission,
    role,
    user
}