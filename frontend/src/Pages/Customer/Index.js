import {useEffect, useState} from 'react';
import { client } from '../../client';

const errorMessage = (
  <div>
    <p>
      Houve um erro
    </p>

    <p>
      {JSON.stringify(error)}
    </p>
  </div>
)

const emptyListMessage = (
  <small>
    A lista está vazia
  </small>
)

function Customers({customers, error}) {
  // Request had an error
  if (error) {
    return errorMessage
  }

  // Empty customers list
  if (!customers.length) {
    return emptyListMessage
  }

  // Has customers
  return (
    <ul>
      {customers.map(i => <li>{i}</li>)}
    </ul>
  )
}

export default function CustomerIndex() {
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    client
      .get('/customers')
      .then(response => setCustomers(response.data))
      .catch(setError)
  }, []);


  return (
    <div>
      <h1>Lista de clientes</h1>

      <div>
        <a href='/#/customer/create'>
          Criar novo cliente
        </a>
      </div>

      <Customers customers={customers} error={error} />
    </div>
  )
}
