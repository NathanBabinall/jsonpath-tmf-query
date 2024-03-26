/* eslint-disable no-shadow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { JSONPath } from 'jsonpath-plus';
import get from 'lodash/get';
import set from 'lodash/set';

export interface BaseOperation {
  path: string;
}
export interface FilterOperation extends BaseOperation {
  op: 'filter';
  offset?: number;
  limit?: number;
}
export interface FieldsOperation extends BaseOperation {
  op: 'fields';
}

export interface SortOperation extends BaseOperation {
  op: 'sort';
  order: 'asc' | 'desc';
}

export type Operation = FilterOperation | FieldsOperation | SortOperation;

const sortOperations = (ops: Operation[]): Operation[] =>
  ops.sort((opA, opB) => {
    const operationOrder = ['sort', 'filter', 'fields'];
    function getOpIndex(operation: Operation) {
      return operationOrder.indexOf(operation.op);
    }

    return getOpIndex(opA) - getOpIndex(opB);
  });

/**
 * Depth first removal of undefined and empty objects
 */
const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    // Get this value
    const value = obj[key];
    if (value == null) {
      // Remove null/undefined values
      delete obj[key];
    } else if (typeof value === 'object') {
      // Recurse
      removeEmpty(value);
      // If it's an object without keys, delete
      if (!Object.keys(value).length) {
        delete obj[key];
      }
      // If its an array, iterate through for non existing values, and splice them
      if (Array.isArray(value)) {
        for (let i = value.length - 1; i >= 0; i -= 1) {
          if (!value[i]) {
            value.splice(i, 1);
          }
        }
      }
    }
  });
};

export const checkValidJsonPath = (jsonpathExpression: any) => {
  if (typeof jsonpathExpression !== 'string') return false;
  try {
    const query = JSONPath.toPathArray(jsonpathExpression);
    return !query.some((element) => {
      if (element === '') {
        throw new Error();
      }
    });
  } catch (_e) {
    try {
      const query = JSONPath.toPathArray(`$${jsonpathExpression}`);
      return !query.some((element) => {
        if (element === '') {
          return true;
        }
      });
    } catch (_e) {
      return false;
    }
  }
};

export default class JSONPathQuery {
  static query(document: any, operations: Operation[]): any {
    const rootIsArray = Array.isArray(document);
    const mutatedDocument = JSON.parse(JSON.stringify(document));
    const hasFields = operations.some((operation) => operation.op === 'fields');
    const hasFilter = operations.some((operation) => operation.op === 'filter');
    let hasSort = operations.some((operation) => operation.op === 'sort');
    let newDocument: {} | [{}];
    let filteredDocument: {} | [{}] = rootIsArray ? [] : {};
    if (hasFilter || rootIsArray) newDocument = [];
    else newDocument = {};
    const pathPrefix = rootIsArray || hasFilter ? '$[*].' : '$.';
    if (hasFields) {
      operations.push({
        op: 'fields',
        path: `${pathPrefix}id`,
      });
      operations.push({
        op: 'fields',
        path: `${pathPrefix}href`,
      });
    }

    const sortedOperations = sortOperations(operations);

    sortedOperations.forEach((operation, index) => {
      hasSort = operations.slice(index).some((remainingOp) => remainingOp.op === 'sort');
      let paths;
      if (operation.path.startsWith('$') === false && operation.path !== 'none') {
        if (rootIsArray) operation.path = `$${operation.path}`;
        else operation.path = `$.${operation.path}`;
      }
      if (hasSort) {
        paths = JSONPath({
          path: operation.path,
          json: mutatedDocument,
          resultType: 'path',
        });
      } else if (hasFilter) {
        paths = JSONPath({
          path: operation.path,
          json: filteredDocument,
          resultType: 'path',
        });
      } else {
        paths = JSONPath({
          path: operation.path,
          json: mutatedDocument,
          resultType: 'path',
        });
      }
      switch (operation.op) {
        case 'filter':
          filteredDocument = JSONPath({
            path: operation.path,
            json: mutatedDocument,
          });
          if (operation.limit && operation.offset) {
            filteredDocument = (filteredDocument as any[]).slice(operation.offset, operation.offset + operation.limit);
          } else if (operation.limit) {
            filteredDocument = (filteredDocument as any[]).slice(0, operation.limit);
          } else if (operation.offset) {
            filteredDocument = (filteredDocument as any[]).slice(operation.offset);
          }
          if (!hasFields) newDocument = filteredDocument;
          break;
        case 'fields':
          if (hasFilter) {
            paths.forEach((_path: string) => {
              const path = JSONPath.toPathArray(_path).filter((p) => p !== '$');
              const element = get(filteredDocument, path);
              set(newDocument, path, element);
            });
          } else {
            paths.forEach((_path: string) => {
              const path = JSONPath.toPathArray(_path).filter((p) => p !== '$');
              const element = get(mutatedDocument, path);
              set(newDocument, path, element);
            });
          }
          break;
        case 'sort':
          let jsonPathQuery = JSONPath.toPathArray(operation.path);
          const sortParam = jsonPathQuery[jsonPathQuery.length - 1];
          jsonPathQuery = jsonPathQuery.slice(0, -2);
          const stringPath = JSONPath.toPathString(jsonPathQuery);
          const arrayOfNodes = JSONPath({
            path: stringPath,
            json: mutatedDocument,
          });
          arrayOfNodes[0].sort((valueA: any, valueB: any) => {
            if (operation.order === 'asc') {
              if (valueA[`${sortParam}`] < valueB[`${sortParam}`]) {
                return -1;
              }
              if (valueA[`${sortParam}`] > valueB[`${sortParam}`]) {
                return 1;
              }
            } else {
              if (valueB[`${sortParam}`] < valueA[`${sortParam}`]) {
                return -1;
              }
              if (valueB[`${sortParam}`] > valueA[`${sortParam}`]) {
                return 1;
              }
            }
            return 0;
          });
          break;
        default:
          break;
      }
    });
    if (hasSort && hasFields === false && hasFilter === false) {
      return mutatedDocument;
    }
    removeEmpty(newDocument);
    return newDocument;
  }
}
