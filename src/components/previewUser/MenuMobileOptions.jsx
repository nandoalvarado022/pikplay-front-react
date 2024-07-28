import styles from './styles.module.scss'

import React from 'react'
import { motion } from "framer-motion"
import CoinIcon from '../coinIcon/CoinIcon'
import { slugify } from '../../lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FormControlLabel } from '@mui/material'
import Link from 'next/link'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import useSystemStore from '../../hooks/storeSystem'

const MenuMobileOptions = () => {
	const router = useRouter()
	const { userLogged, logout } = useSystemStore((state => state))
	const { name, coins } = userLogged
	const MaterialUISwitch = styled(Switch)(({ theme }) => ({
		width: 62,
		height: 34,
		padding: 7,
		'& .MuiSwitch-switchBase': {
			margin: 1,
			padding: 0,
			transform: 'translateX(6px)',
			'&.Mui-checked': {
				color: '#fff',
				transform: 'translateX(22px)',
				'& .MuiSwitch-thumb:before': {
					backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
						'#fff',
					)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
				},
				'& + .MuiSwitch-track': {
					opacity: 1,
					backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
				},
			},
		},
		'& .MuiSwitch-thumb': {
			backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
			width: 32,
			height: 32,
			'&::before': {
				content: "''",
				position: 'absolute',
				width: '100%',
				height: '100%',
				left: 0,
				top: 0,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff',
				)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
			},
		},
		'& .MuiSwitch-track': {
			opacity: 1,
			backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			borderRadius: 20 / 2,
		},
	}));

	const handleLogout = () => {
		logout()
		router.push('/?action=logout')
	}

	const container = {
		hidden: { opacity: 1, scale: 1, x: "-100vw" },
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2 // Tiempo para que cada elemento hijo empiece a salir
			}
		}
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1
		}
	};

	return <motion.div
		animate="visible"
		className={styles.bg_black}
		id="bg_black"
		initial="hidden"
		variants={container}>
		<motion.ol variants={item}>
			<Link href={`/perfil/${slugify(name)}`}>
				Mi cuenta
				<div className={styles.coinContent}>
					<CoinIcon coins={coins} />
				</div>
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<Link href={`/desafios-y-ranking`}>
				<FontAwesomeIcon icon={faGamepad} />
				{/* <Image className={styles.icon} src="/images/icons/ranking.png" width={20} height={20} /> */}
				Desafios y Ranking
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<Link href='/usuario/me' as='/usuario/me'>
				<FontAwesomeIcon icon={faStore} />
				Soy vendedor
				<br />
				{/* <Coins /> */}
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<Link href='/concursos' as='/concursos'>
				<FontAwesomeIcon icon={faDiceFive} />
				Actividades
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<Link href='/transacciones' as='/transacciones'>
				<FontAwesomeIcon icon={faMoneyBill} />
				Transacciones
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<Link href='/publicaciones' as='/publicaciones'>
				Mis Publicaciones
			</Link>
		</motion.ol>
		<motion.ol variants={item}>
			<a>
				<FontAwesomeIcon icon={faTools} />
				Configuración
			</a>
		</motion.ol>
		<motion.ol variants={item}>
			<FormControlLabel
				control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
				label="Modo nocturno"
			/>
			{/* <Switch
            // checked={true}
            // onChange={ }
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          /> */}
		</motion.ol>
		<motion.ol variants={item}>
			<Link href="/onboarding">
				Onboarding
			</Link>
		</motion.ol>
		<motion.ol variants={item} onClick={() => handleLogout()}>
			<FontAwesomeIcon icon={faPowerOff} />
			Salir
		</motion.ol>
	</motion.div>
}

export default MenuMobileOptions
