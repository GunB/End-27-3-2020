import { convertMultiLevelIntoArrayKeySingleObject } from './../utils/convertMultiLevelIntoSingle';

export const filterDetallesOrden = (orderData) => {
    return convertMultiLevelIntoArrayKeySingleObject({ ...orderData })
};