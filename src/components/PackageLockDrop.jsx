import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const recursiveFilterObjectKeys = (obj) => Object.keys(obj).reduce((filteredObject, keyName) => {
    const { dependencies, version } = obj[keyName];
    const newObj = { version };
    const newFilteredObject = filteredObject;

    if (dependencies) newObj.dependencies = recursiveFilterObjectKeys(dependencies);

    newFilteredObject[keyName] = newObj;

    return newFilteredObject;
}, {});

const parsePackageLock = (packageLock) => JSON.parse(packageLock).dependencies;

function PackageLockDrop({ setPackages }) {
    const onDrop = useCallback(async (acceptedFiles) => {
        const reader = new window.FileReader();

        reader.onload = () => {
            const parsedResults = parsePackageLock(reader.result);

            setPackages(() => recursiveFilterObjectKeys(parsedResults));
        };

        reader.readAsText(acceptedFiles[0]);
    }, [setPackages]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    /* eslint-disable react/jsx-props-no-spreading */
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive
                    ? <p>Drop the files here ...</p>
                    : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            }
        </div>
    );
}

PackageLockDrop.propTypes = {
    setPackages: PropTypes.func.isRequired,
};

export default PackageLockDrop;
