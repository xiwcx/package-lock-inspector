import { useEffect, useState } from 'react';

function useSearchString(location) {
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setSearchString(params.get('query') || '');
    }, [location.search]);

    return searchString;
}

export default useSearchString;
