import { useEffect, useState } from 'react';

const PACKAGE_LOCK = 'packageLock';

function usePackages() {
    const [packages, setPackages] = useState(
        JSON.parse(localStorage.getItem(PACKAGE_LOCK)) || {},
    );

    useEffect(() => {
        localStorage.setItem(PACKAGE_LOCK, JSON.stringify(packages));
    });

    return [packages, setPackages];
}

export default usePackages;
