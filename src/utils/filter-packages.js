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

/**
 * returns number of matches within a given path
 * @function recursiveFilter
 * @param {object} accumulator - object collecting filtered packages tree
 * @param {object} context - context from deepdash reduceDeep
 * @param {object} packages - package lock tree
 * @param {string} searchString - string being searched
 *
 * @returns {object} updated accumulator
 */
const recursiveFilter = (accumulator, context, packages, searchString) => {
    let newAccumulator = accumulator;
    const pathMatchCount = getPathMatchCount(context.parent.path, searchString);

    const addPackage = (pkg, depth, matchCount) => {
        /**
         * this is particular to the API of reduceDeep which returns objects like
         * `parent.parent.parent...`
         *
         * use depth to fill an array with 'parent' values, then use ramda's path
         * to retrieve the current object from deepdash
         *
         * @constant
         * @type {array}
         */
        const currentDeepDashObject = path(Array(depth).fill('parent'), context);
        const newMatchCount = isIncludedInPackageName(currentDeepDashObject.key, searchString)
            ? matchCount - 1 // reduce matchCount by 1 if there is a match
            : matchCount;
        const deleteCount = pkg.path.length - depth + 1;
        const currentPath = [...pkg.path].splice(0, deleteCount);
        const pkgClone = clone(path(currentPath, packages));

        // if the current path is not found in the current state of the accumulator
        if (!path(currentPath, newAccumulator)) {
            const currentPathTo = [...pkg.path].splice(0, deleteCount - 1);

            // empty out dependencies as they may not be relevant and will be built back up
            // in subsequent calls if they are
            pkgClone.dependencies = {};

            if (currentPathTo.length) {
                // if `currentPathTo` is greater than zero use lens to set value on the
                // newAccumulator
                newAccumulator = set(
                    lensPath(currentPath),
                    pkgClone,
                    newAccumulator,
                );
            } else {
                // otherwise set the value directly at the base of the newAccumulator
                newAccumulator[currentDeepDashObject.key] = pkgClone;
            }
        }

        if (depth > 1 && newMatchCount > 0) {
            // if `depth` is greter than one and `newMatchCount` is greater than zero
            // call `addPackage` recursively
            addPackage(
                pkg,
                depth - 2, // remove two at a time as keys alternate between names and dependencies
                newMatchCount,
            );
        }
    };

    // if the context has parents and there is a pathMatchCount add package
    if (context.parent && pathMatchCount) {
        addPackage(
            context.parent,
            context.parent.path.length,
            pathMatchCount,
        );
    }

    return newAccumulator;
};

/**
 * returns packages object filtered down to matches and their parents filtering out children and
 * siblings that don't match.
 *
 * @function filterPackages
 *>
 * @param {object} packages - package lock tree
 * @param {string} searchString - string being searched
 *
 * @returns {object} new tree filtered down by search string
 */
const filterPackages = (packages, searchString) => {
    const itaratee = (accumulator, value, key, parentValue, context) => (
        recursiveFilter(accumulator, context, packages, searchString)
    );

    return reduceDeep(packages, itaratee, {}, {
        pathFormat: 'array',
        leavesOnly: true, // saves many iterations
    });
};

export default filterPackages;
