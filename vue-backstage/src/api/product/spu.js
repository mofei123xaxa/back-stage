//二次封装数据使用
import request from '@/utils/request';

//向服务器发请求，获取服务器spu数据
//URL:/admin/product/{page}/{limit}   get page  limit category3Id
export const reqSpuList = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu信息
//url:/admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});

//获取品牌信息
//URL://admin/product/baseTrademark/getTrademarkList  get
export const reqTradmarkList = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'});

//获取SPU图标接口
//URL:/admin/product/spuImageList/{spuId}   get
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

//获取平台销售属性,整个平台只有两个销售属性
//URL:/admin/product/baseSaleAttrList  get
export const reqBaseSaleAttrList = ()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})

//点击保存进行发送数据，是修改||添加
export const reqAddorUpdateSpu = (spuInfo)=>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}


//删除spu数据
//URL：/admin/product/deleteSpu/{spuId}   delete
export const reqDeleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})



//获取图片数据
//URL：/admin/product/spuImageList/{spuId}  get
export const reqImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

//获取销售属性列表
//URL：/admin/product/spuSaleAttrList/{spuId}  get
export const reqSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

//获取平台属性数据
//URL:/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});


//添加SKU
//URL：/admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo});

//添加SKU列表数据的接口
//URL:/admin/product/findBySpuId/{spuId}   get 
export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'});

