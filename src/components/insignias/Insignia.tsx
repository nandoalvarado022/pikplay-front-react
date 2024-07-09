import React from 'react'
import classNames from 'classnames'
import styles from './insignias.module.scss'
import { Tooltip } from '@mui/material';
import Image from 'next/image';

const Insignia = ({ data }) => {
    const { id, name, isNew, insigniaClass, image } = data
    return (
        <Tooltip title={name} placement="top">
            <div className={classNames("Insignia animatedZoom", {
                [styles[id]]: true,
                [styles.new]: isNew,
                [styles.insigniaClass]: true,                
            })}>
                <Image alt="Imagen de insignia" src={image} width={200} height={120} />
            </div>
        </Tooltip>
    );
}

export default Insignia
