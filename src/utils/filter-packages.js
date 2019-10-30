import { reduceDeep } from 'deepdash-es/standalone';
import {
    clone,
    lensPath,
    path,
    set,
} from 'ramda';

/**
 * returns whether a search string matches a base string
 * @function isIncludedInPackageName
 * @param {string} str - base string
 * @param {string} searchString - string being searched
 *
 * @returns {boolean}
 */
export const isIncludedInPackageName = (str, searchString) => str.includes(searchString);

/**
 * returns number of matches within a given path
 * @function getPathMatchCount
 * @param {array} packagePath - array of keys to an value in an object
 * @param {string} searchString - string being searched
 *
 * @returns {integer}
 */
export const getPathMatchCount = (packagePath, searchString) => {
    const matches = packagePath
        .filter((str) => (str !== 'dependencies') && isIncludedInPackageName(str, searchString));

    return matches.length;
};

const recursiveFilter = (accumulator, context, packages, searchString) => {
    let newAccumulator = accumulator;
    const pathMatchCount = getPathMatchCount(context.parent.path, searchString);

    const addPackage = (pkg, depth, matchCount) => {
        const currentDeepDashObject = path(Array(depth).fill('parent'), context);
        const newMatchCount = isIncludedInPackageName(currentDeepDashObject.key, searchString)
            ? matchCount - 1
            : matchCount;

        const deleteCount = pkg.path.length - depth + 1;
        const currentPath = [...pkg.path].splice(0, deleteCount);
        const pkgClone = clone(path(currentPath, packages));

        if (!path(currentPath, newAccumulator)) {
            const currentPathTo = [...pkg.path].splice(0, deleteCount - 1);

            pkgClone.dependencies = {};

            if (currentPathTo.length) {
                newAccumulator = set(
                    lensPath(currentPath),
                    pkgClone,
                    newAccumulator,
                );
            } else {
                newAccumulator[currentDeepDashObject.key] = pkgClone;
            }
        }

        if (depth > 1 && newMatchCount > 0) {
            addPackage(
                pkg,
                depth - 2,
                newMatchCount,
            );
        }
    };

    if (context.parent && pathMatchCount) {
        addPackage(
            context.parent,
            context.parent.path.length,
            pathMatchCount,
        );
    }

    return newAccumulator;
};

const filterPackages = (packages, searchString) => {
    const itaratee = (accumulator, value, key, parentValue, context) => (
        recursiveFilter(accumulator, context, packages, searchString)
    );

    return reduceDeep(packages, itaratee, {}, {
        pathFormat: 'array',
        leavesOnly: true,
    });
};

export default filterPackages;
