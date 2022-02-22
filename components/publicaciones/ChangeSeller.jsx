import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import styles from './changeSeller.module.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from '../button/Button'

const ChangeSeller = ({ changeSellerHandle, id_publication, user_id }) => {
    const [name, setName] = useState('')
    const [defaultValue, setDefaultValue] = useState(null)
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

    const [getUsers, { loading, error, data: users }] = useLazyQuery(USERS_QUERY, {
        variables: { name },
        fetchPolicy: "no-cache"
    })

    const [dispatch, { }] = useMutation(CHANGE_SELLER_MUTATION);

    const handleSubmit = (value) => {
        dispatch({ variables: { id_publication, id_seller: value.id } })
        changeSellerHandle(value)
        setDefaultValue(value)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log(users)
        if (users) {
            // const value = users.getUsers.indexOf(users.getUsers.find(item => item.id == user_id))
            const value = users.getUsers.find(item => item.id == user_id)
            console.log(value)
            setDefaultValue(value)
        }
    }, [users])

    return <div className={styles.ChangeSeller}>
        <div className="flex">
            <Autocomplete
                id="combo-box-demo"
                options={users?.getUsers}
                onChange={(e, value) => { handleSubmit(value) }}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Cambiar Seller" />}
                value={defaultValue}
            />
        </div>
    </div>
}

export default ChangeSeller
