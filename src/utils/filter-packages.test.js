/* eslint-env jest */
import filterPackages, {
    getPathMatchCount,
    isIncludedInPackageName,
} from './filter-packages';

const packages = {
    foo: {
        dependencies: {
            bang: {
                version: '^1.2.3',
            },
            fizz: {
                version: '^1.2.3',
            },
        },
        version: '^1.2.3',
    },
    bar: {
        version: '^1.2.3',
    },
};

const result = {
    foo: {
        dependencies: {
            fizz: {
                dependencies: {},
                version: '^1.2.3',
            },
        },
        version: '^1.2.3',
    },
};

test('getPathMatchCount functions correctly', () => {
    expect.assertions(3);

    const path = ['a', 'path', 'to', 'a', 'thing'];
    const differentString = 'not a thing';
    const matchString = 'thing';
    const multipleMatchString = 'a';

    expect(getPathMatchCount(path, multipleMatchString)).toEqual(3);
    expect(getPathMatchCount(path, matchString)).toEqual(1);
    expect(getPathMatchCount(path, differentString)).toEqual(0);
});

test('isIncludedInPackageName functions correctly', () => {
    expect.assertions(2);

    const searchString = 'app';
    const differentString = 'grape';
    const matchString = 'apple';

    expect(isIncludedInPackageName(matchString, searchString)).toBeTruthy();
    expect(isIncludedInPackageName(differentString, searchString)).toBeFalsy();
});

test('filterPackages functions correctly', () => {
    expect.assertions(1);

    expect(filterPackages(packages, 'fizz')).toStrictEqual(result);
});
