import request from '@/utils/request';

//获取品牌数据API
//接口/admin/acl/user/{page}/{limit}  method：get
//接口：/admin/product/baseTrademark/
export  const reqTradeMark = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//增加商品
//URL:/admin/product/baseTrademark/seve  post  携带两个参数：tmName   logUrl
//注意：增加商品是不需要传递ID，id由服务器生成

//修改商品属性
//URL：/admin/product/baseTrademark/update   put    携带三个参数  tmName  logUrl  id
//修改商品需要传递id 需要告诉服务器是修改的哪一个数据

export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    //使用if进行判断是否有没有id
    if(tradeMark.id){
        //携带id就是修改商品
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        //没有携带id就是增加商品
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}

//删除商品的回调函数
//URL：/admin/product/baseTrademark/remove/{id}   delete

export const reqDeleteTradeMark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
