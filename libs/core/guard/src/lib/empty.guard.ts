type EmptyGuardType = undefined | null | string | number | boolean | Date | Array<unknown> | object;

export const EmptyGuard = (value: EmptyGuardType) => {

  if (typeof value === 'number' || typeof value === 'boolean') {
    return false;
  }

  if (typeof value === 'undefined' || value === null) {
    return true;
  }

  if (value instanceof Date) {
    return false;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    }
    if (value.every((item) => EmptyGuard(item))) {
      return true;
    }
  }

  if (value instanceof Object && !Object.keys(value).length) {
    return true;
  }


  if (value === '') {
    return true;
  }

  return false;

}
