import React from 'react';
import styles from './Spinner.module.css';

export default function Spinner() {
    return (
        <div className={`preloader-wrapper small active ${styles.Small}`}>
            <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                    <div className="circle"/>
                </div>
                <div className="gap-patch">
                    <div className="circle"/>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    );
}
