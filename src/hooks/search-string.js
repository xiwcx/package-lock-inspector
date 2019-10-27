import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function useSearchString() {
    const location = useLocation();
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setSearchString(params.get('query') || '');
    }, [location.search]);

    return searchString;
}

export default useSearchString;
