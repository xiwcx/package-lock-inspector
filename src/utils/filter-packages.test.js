/* eslint-disable */
import {
    getPathMatchCount,
    isIncludedInPackageName,
} from './filter-packages';

test('getPathMatchCount functions correctly', () => {
    expect.assertions(3)

    const path = ['a', 'path', 'to', 'a', 'thing'];
    const differentString = 'not a thing';
    const matchString = 'thing';
    const multipleMatchString = 'a';

    expect(getPathMatchCount(path, multipleMatchString)).toEqual(3);
    expect(getPathMatchCount(path, matchString)).toEqual(1);
    expect(getPathMatchCount(path, differentString)).toEqual(0);
});

test('isIncludedInPackageName functions correctly', () => {
    expect.assertions(2)

    const searchString = 'app';
    const differentString = 'grape';
    const matchString = 'apple';

    expect(isIncludedInPackageName(matchString, searchString)).toBeTruthy();
    expect(isIncludedInPackageName(differentString, searchString)).toBeFalsy();
});
