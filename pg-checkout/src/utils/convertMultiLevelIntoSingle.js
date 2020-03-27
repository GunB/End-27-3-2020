import { CONCAT_ID_SEPARATOR_MULTILEVEL } from "../constants/config";

export const convertMultiLevelIntoSingle = (multiLvlObject, separator = CONCAT_ID_SEPARATOR_MULTILEVEL, lvlkeys = []) => {
    let newLvlObject = { ...multiLvlObject };
    let singleLvlObject = {};
    let isObject = undefined;
    for (let key in newLvlObject) {
        if (newLvlObject.hasOwnProperty(key)) {
            if (typeof newLvlObject[key] === 'object') {
                let recursive = convertMultiLevelIntoSingle(
                    newLvlObject[key],
                    separator,
                    [...lvlkeys, key]
                );
                isObject = !(Object.keys(recursive).length === 0 && recursive.constructor === Object);
                singleLvlObject = {
                    ...singleLvlObject,
                    ...recursive
                };
            } else {
                isObject = false;
            }
            if (!isObject) {
                let joinedKey = [...lvlkeys, key].join(separator);
                singleLvlObject[joinedKey] = newLvlObject[key];
            }
        }
    }
    return singleLvlObject;
};

export const convertMultiLevelIntoSingleArray = (multiLvlObject, separator = CONCAT_ID_SEPARATOR_MULTILEVEL, lvlkeys = []) => {
    const newLvlObject = { ...multiLvlObject };
    let singleLvlObject = [];
    let isObject = undefined;
    for (let key in newLvlObject) {
        if (newLvlObject.hasOwnProperty(key)) {
            if (typeof newLvlObject[key] === 'object') {
                const recursive = convertMultiLevelIntoSingleArray(
                    newLvlObject[key],
                    separator,
                    [...lvlkeys, key]
                );
                isObject = !(recursive.length === 0);
                singleLvlObject = [
                    ...singleLvlObject,
                    ...recursive
                ];
            } else {
                isObject = false;
            }
            if (!isObject) {
                let joinedKey = [...lvlkeys, key].join(separator);
                singleLvlObject.push({ value: newLvlObject[key], key: joinedKey });
            }
        }
    }
    return singleLvlObject;
};

export const clean = (obj) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}

export const isOnlyObjectChildren = (multiLvlObject) => {
    let entries = Object.entries({ ...multiLvlObject });
    const objectValidation = [...new Set(entries.map((element) => {
        const [, value] = element;
        return typeof value === 'object';
    }))]
    return { entries, isOnlyObject: (objectValidation.length === 1 && objectValidation[0]) }
}

export const findSingleLvlIntoMulti = (id, object, separator = CONCAT_ID_SEPARATOR_MULTILEVEL) => {
    const ids = id.split(separator);
    let reference = undefined;
    ids.forEach(element => {
        if (reference !== undefined) {
            reference[element]
        } else {
            reference = object[element];
        }
        return element;
    });
}

/**
 * 
 * @param {*} param0 {key, value} Where Key is a simble key conected by @separator and value the actual value to assign
 * @param {*} originalObject Original object looking for keys
 * @param {*} separator Element that joins the key at @param0
 */
export const updateDataSingleLvlIntoMulti = ({ key, value }, originalObject, simple = true, separator = CONCAT_ID_SEPARATOR_MULTILEVEL) => {
    let multiLvlObject = { ...originalObject }
    const ids = key.split(separator);
    const keys = Object.keys(multiLvlObject);
    const id = ids.shift();
    let find = keys.find((newKey => id === newKey));

    if (find) {
        if (ids.length > 0) {
            multiLvlObject[id] =
                updateDataSingleLvlIntoMulti({ key: ids.join(separator), value }, multiLvlObject[id], simple, separator)
        } else {
            simple ?
                multiLvlObject[id] = value :
                multiLvlObject[id].value = value;
        }
    }
    return multiLvlObject;
}

export const multiUpdateSingleMulti = (objectA, originalObject, simple = true) => {
    let response = { ...originalObject };
    const keys = Object.keys(objectA);
    keys.map((key) => {
        response = updateDataSingleLvlIntoMulti({ key, value: objectA[key] }, response, simple)
    })
    return response;
}

/**
 *
 * @param {object} multiLvlObject object to transform
 * @param {functionData} functionData @argument {keys: [...keys], joinedKeys, value, entries: [...entries], separator, response: [...response]}
 * @param {string} separator CONCAT_ID_SEPARATOR_MULTILEVEL
 * @param {array} lvlkeys [] Don't change, recursive tool
 */
export const convertMultiLevelIntoArrayKeySingleObject = (multiLvlObject, functionData = joinData, separator = CONCAT_ID_SEPARATOR_MULTILEVEL, lvlkeys = []) => {
    let response = [];
    const { entries, isOnlyObject } = isOnlyObjectChildren(multiLvlObject);
    if (isOnlyObject) {
        entries.map((entry) => {
            const [key, value] = entry;
            let keys = [...lvlkeys, key];
            response = [...response, ...convertMultiLevelIntoArrayKeySingleObject(value, functionData, separator, keys)]
        });
    } else {
        let keys = [...lvlkeys];
        let value = { ...multiLvlObject }
        const joinedKeys = keys.join(separator);
        response = [...response, ...functionData({
            keys: [...keys], joinedKeys, value, entries: [...entries], separator, response: [...response]
        })];
    }
    return response;
}

const joinData = ({ keys, joinedKeys, value, response }) => {
    response.push({
        key: joinedKeys,
        value,
        keys
    })
    return response;
}