import ReactGA from 'react-ga';

const isProduction = process.env.NODE_ENV === 'production';


export const GAevent = (eventObject) => (isProduction
    ? ReactGA.event(eventObject)
    : null);

export const GAinit = () => (isProduction
    ? ReactGA.initialize('UA-151113211-1')
    : null);

export const GApageview = ({ pathname, search }) => (isProduction
    ? ReactGA.pageview(`${pathname}${search}`)
    : null);
