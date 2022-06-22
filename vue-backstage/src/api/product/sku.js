//sku模块
import request from '@/utils/request';

//获取sku表单数据
//URL：/admin/product/list/{page}/{limit}   get
export const reqSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'});

//上架
//URL：/admin/product/onSale/{skuId}  get
export const reqSale = (skuId) =>request({url:`/admin/product/onSale/${skuId}`,method:'get'});

//下架
//URL:/admin/product/cancelSale/{skuId}  get
export const reqCancel = (skuId) =>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'});

//获取SKU详情列表
//URL：/admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'});    