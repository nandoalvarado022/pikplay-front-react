import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import styles from './changeSeller.module.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from '../button/Button'

const ChangeSeller = ({ id_publication }) => {
    const [name, setName] = useState('')
    const [sellerUpdated, setSellerUpdated] = useState(null)

    const USERS_QUERY = gql`
	query getUsers($name: String){
		getUsers(name: $name){
            id
			name
		}
	}`

    const CHANGE_SELLER_MUTATION = gql`
	mutation changeSeller($id_seller: Int, $id_publication: Int){
		changeSeller(id_seller: $id_seller, id_publication: $id_publication)
	}`

    const [getUsers, { loading: loadingPublications, error, data: users }] = useLazyQuery(USERS_QUERY, {
        variables: { name },
        fetchPolicy: "no-cache"
    })

    const [dispatch, { }] = useMutation(CHANGE_SELLER_MUTATION);

    const handleSubmit = () => {
        dispatch({ variables: { id_publication, id_seller: sellerUpdated } })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <div className={styles.ChangeSeller}>
        <div className="flex m-t-10">
            <Autocomplete
                id="combo-box-demo"
                options={users?.getUsers}
                onChange={(e, value) => { setSellerUpdated(value.id) }}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Cambiar Seller" variant="outlined" />}
            />
            <Button color='blue' className="m-l-10" onClick={handleSubmit}>Cambiar</Button>
        </div>
    </div>
}

export default ChangeSeller
