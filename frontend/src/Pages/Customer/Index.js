import page from 'page';
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

function openCustomer(id) {
  page(`/#/customer/${id}`)
}

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
    <div className="p-2">
      <table className='bg-gray-100 rounded overflow-hidden w-full'>
        <thead>
          <tr className='bg-gray-800 text-white text-sm'>
            <th className='text-left p-2'>Nome</th>
            <th className='text-left p-2'>E-mail</th>
            <th className='text-left p-2'>CPF</th>
            <th className='text-left p-2'>Endereço</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr
              key={c.id}
              className='p-2 odd:bg-gray-200 text-left hover:bg-yellow-300 hover:cursor-pointer'
              onClick={() => openCustomer(c.id)}
            >
              <td className='p-2 text-gray-900'>
                {c.name}
              </td>
              <td className='p-2 text-sm text-gray-700'>
                {c.email}
              </td>
              <td className='p-2 text-sm text-gray-700'>
                {c.cpf}
              </td>
              <td className='p-2 text-sm text-gray-700'>
                {c.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CustomerIndex() {
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    client
      .get('/customers', {params: {search}})
      .then(response => setCustomers(response.data.data))
      .catch(setError)
  }, [search]);

  return (
    <div>
      <h1 className="heading-1 text-left p-3 bg-gray-800 text-white">
        Lista de clientes
      </h1>

      <div className="container mx-auto">
        <div className='flex p-2'>
          <input
            type="search"
            className='mr-auto'
            placeholder='Buscar'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

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
