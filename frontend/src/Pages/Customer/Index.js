import {useEffect, useState} from 'react';
import { client } from '../../client';

const errorMessage = (error) => (
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
  <p className='text-gray-700 text-2xl p-10 animate-pulse ease-in-out duration-700'>
    A lista está vazia
  </p>
)

function Customers({customers, error}) {
  // Request had an error
  if (error) {
    return errorMessage(error)
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
      <h1 className="heading-1 text-left p-3 bg-gray-800 text-white">
        Lista de clientes
      </h1>

      <div className="container mx-auto">
        <div className='flex p-2 justify-end'>
          <a
            href='/#/customer/create'
            className='btn btn-blue block w-full sm:w-auto'
          >
            Criar novo cliente
          </a>
        </div>

        <Customers customers={customers} error={error} />
      </div>
    </div>
  )
}
