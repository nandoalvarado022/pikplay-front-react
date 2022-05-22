import React from "react"
import Button from "../button/Button"

const Checkout = (props) => {

	const openchekout = e => {
		e.preventDefault();

		var handler = window.ePayco.checkout.configure({
			key: '15e4f81c38f66bb570bc33a5a97a5f0b',
			test: true
		});

		let data = {
			name: "Vestido Mujer Primavera",
			description: "Vestido Mujer Primavera",
			invoice: "1234",
			currency: "cop",
			amount: '119000',
			tax_base: '100000',
			tax: '19000',
			country: "co",
			lang: "es",
			external: "false",
			extra1: "extra1",
			extra2: "extra2",
			extra3: "extra3",
			confirmation: "https://confirmacion.php",
			response: "https://payco.co",
			name_billing: 'john doe',
			address_billing: "Carrera 19 numero 14 91",
			type_doc_billing: "cc",
			mobilephone_billing: "3050000000",
			number_doc_billing: "100000000",
			email_billing: 'example@mail.co'
		}
		handler.open(data);
	}

	return <React.Fragment>
		<Button onClick={openchekout} color="blue">Pagar</Button>
	</React.Fragment>
}

export default Checkout
