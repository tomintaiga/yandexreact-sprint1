import AppHeader from '../../components/app-header/app-header';
import curStyle from './root.module.css';
import React from 'react';

interface IRootProps {
    children: React.ReactNode;
};

const Root: React.FC<IRootProps> = ({children}: IRootProps) => {
    return (
        <div className={curStyle.root}>
            <AppHeader />
            {children}
        </div>
    );
}

export default Root;