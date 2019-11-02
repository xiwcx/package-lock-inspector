import { useEffect, useState } from 'react';
import { CONFIG_LOCAL_STORAGE } from '../utils/config';


const PACKAGE_LOCK = 'package-lock';
const getInitialPackagesValue = (configLocalStorage) => (configLocalStorage
    ? JSON.parse(localStorage.getItem(PACKAGE_LOCK)) || {}
    : {});
const setPackagesLocalStorageValue = (configLocalStorage, packages) => (configLocalStorage
    ? localStorage.setItem(PACKAGE_LOCK, JSON.stringify(packages))
    : null);

function usePackages() {
    const configLocalStorage = localStorage.getItem(CONFIG_LOCAL_STORAGE);
    const [packages, setPackages] = useState(getInitialPackagesValue(configLocalStorage));

    useEffect(() => {
        setPackagesLocalStorageValue(
            configLocalStorage,
            packages,
        );
    });

    return [packages, setPackages];
}

export default usePackages;
