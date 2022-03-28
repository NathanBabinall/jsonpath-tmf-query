/* eslint-disable no-case-declarations */
/*  */
import jp from 'jsonpath';
import get from 'lodash.get';
import set from 'lodash.set';

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
  order: 'asc' | 'desc'
}

export type Operation = FilterOperation | FieldsOperation | SortOperation;

const sortOperations = (ops: Operation[]):Operation[] => ops.sort((opA, opB) => {
  const operationOrder = ['sort', 'filter', 'fields'];
  function getOpIndex(operation: Operation) {
    return operationOrder.indexOf(operation.op);
  }

  return getOpIndex(opA) - getOpIndex(opB);
});

export default class JSONPathQuery {
  static query(document: any, operations: Operation[]): any {
    const rootIsArray = Array.isArray(document);
    const hasFields = operations.some((operation) => operation.op === 'fields');
    const hasFilter = operations.some((operation) => operation.op === 'filter');
    let hasSort = operations.some((operation) => operation.op === 'sort');
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
    let filteredDocument: {} | [{}] = rootIsArray ? [] : {};
    let newDocument: {} | [{}];
    if (hasFilter || rootIsArray) newDocument = [];
    else newDocument = {};
    const sortedOperations = sortOperations(operations);
    sortedOperations.forEach((operation, index) => {
      hasSort = operations.slice(index).some((remainingOp) => remainingOp.op === 'sort');
      let paths: jp.PathComponent[][];
      if (hasSort) paths = jp.paths(document, operation.path);
      else if (hasFilter) paths = jp.paths(filteredDocument, operation.path);
      else paths = jp.paths(document, operation.path);
      switch (operation.op) {
        case 'filter':
          filteredDocument = jp.query(document, operation.path);
          if (operation.limit && operation.offset) {
            filteredDocument = (filteredDocument as any[]).slice(operation.offset, operation.offset + operation.limit);
          } else if (operation.limit) {
            filteredDocument = (filteredDocument as any[]).slice(0, (operation.limit));
          } else if (operation.offset) {
            filteredDocument = (filteredDocument as any[]).slice(operation.offset);
          }
          if (!hasFields) newDocument = filteredDocument;
          break;
        case 'fields':
          if (hasFilter) {
            paths.forEach((_path) => {
              const path = _path.filter((p) => p !== '$');
              const element = get(filteredDocument, path);
              set(newDocument, path, element);
            });
          } else {
            paths.forEach((_path) => {
              const path = _path.filter((p) => p !== '$');
              const element = get(document, path);
              set(newDocument, path, element);
            });
          }
          break;
        case 'sort':
          let jsonPathQuery = jp.parse(operation.path);
          const sortParam = jsonPathQuery[jsonPathQuery.length - 1].expression.value;
          jsonPathQuery = jsonPathQuery.slice(0, -2);
          const stringPath = jp.stringify(jsonPathQuery);
          const arrayOfNodes = jp.nodes(document, stringPath);

          arrayOfNodes[0].value.sort((valueA: any, valueB: any) => {
            if (operation.order === 'asc') {
              if (valueA[`${sortParam}`] < valueB[`${sortParam}`]) { return -1; }
              if (valueA[`${sortParam}`] > valueB[`${sortParam}`]) { return 1; }
            } else {
              if (valueB[`${sortParam}`] < valueA[`${sortParam}`]) { return -1; }
              if (valueB[`${sortParam}`] > valueA[`${sortParam}`]) { return 1; }
            }
            return 0;
          });
          break;
        default:
          break;
      }
    });
    return newDocument;
  }
}
