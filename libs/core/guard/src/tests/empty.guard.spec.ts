// write unit test for the EmptyGuard

import {EmptyGuard} from "../lib/empty.guard";

describe('EmptyGuard', () => {

it('should return true if value is undefined', () => {
    expect(EmptyGuard(undefined)).toBe(true);
  });

  it('should return true if value is null', () => {
    expect(EmptyGuard(null)).toBe(true);
  });

  it('should return true if value is empty string', () => {
    expect(EmptyGuard('')).toBe(true);
  });

  it('should return true if value is empty array', () => {
    expect(EmptyGuard([])).toBe(true);
  });

  it('should return true if value is empty object', () => {
    expect(EmptyGuard({})).toBe(true);
  });

  it('should return false if value is number', () => {
    expect(EmptyGuard(1)).toBe(false);
  });

  it('should return false if value is boolean', () => {
    expect(EmptyGuard(true)).toBe(false);
  });

  it('should return false if value is Date', () => {
    expect(EmptyGuard(new Date())).toBe(false);
  });

  it('should return false if value is string', () => {
    expect(EmptyGuard('string')).toBe(false);
  });

  it('should return false if value is array', () => {
    expect(EmptyGuard([1])).toBe(false);
  });

  it('should return true if value is array of empties', () => {
    expect(EmptyGuard([undefined, null, ""])).toBe(true);
  });

  it('should return false if value is object', () => {
    expect(EmptyGuard({a: 1})).toBe(false);
  });


});
