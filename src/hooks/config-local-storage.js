import { useEffect, useState } from 'react';

const CONFIG_LOCAL_STORAGE = 'configLocalStorage';

function useConfigLocalStorage() {
    const [configLocalStorage, setConfigLocalStorage] = useState(
        localStorage.getItem(CONFIG_LOCAL_STORAGE) || false,
    );

    useEffect(() => {
        localStorage.setItem(CONFIG_LOCAL_STORAGE, configLocalStorage);
    });

    return [configLocalStorage, setConfigLocalStorage];
}

export default useConfigLocalStorage;
