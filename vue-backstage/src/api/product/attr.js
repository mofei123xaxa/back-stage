//商品管理接口

//获取二次封装的函数
import request from '@/utils/request';

//获取一级分类数据接口  get
//URL:/admin/product/getCategory1   get
export const reqgetCategory1Id = ()=>request({url:'/admin/product/getCategory1',method:'get'});

//获取二级分类数据接口  get
// URL：/admin/product/getCategory2/{category1Id}  get
export const reqgetCategory2Id = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})

//获取商品三级分类数据接口  get
// URL:/admin/product/getCategory3/{category2Id} 
export const reqgetCategory3Id = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

//带着三个ID获取商品列表
//URL；/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   get
export const reqAttrList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//改变商品的属性名||属性值
//URL：/admin/product/saveAttrInfo    post  携带参数（很多）
export const reqAddAttrOrUpdate = (data)=>request({url:'/admin/product/saveAttrInfo',data,method:'post'})
