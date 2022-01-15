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

function PaginationInfo({pagination}) {
  // Generate 10 page numbers from -5 to +5 pages
  const rangeGenerator = (n) => [n, n+1, n-1, n+2, n-2, n+3, n-3, n+4, n-4, n+5, n-5]
    .filter(n => n > 0 && n < (1 + pagination.lastPage))
    .slice(0, 5)
    .sort((a, b) => a - b)
  const pageRange = rangeGenerator(pagination.currentPage)

  return (
    <div className="flex my-2 items-center">
      <div className='flex space-x-1'>
        {pageRange.includes(1) || (
          <a href="/#/customers?page=1" className='text-sm btn !px-2 block btn-blue'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
        )}

        {pageRange.map(x => x == pagination.currentPage ? (
            <span key={x} className='text-sm btn bg-blue-800 text-white block select-none'>
              {pagination.currentPage}
            </span>
          ) : (
            <a key={x} href={`/#/customers?page=${x}`} className='text-sm btn btn-blue block'>
              {x}
            </a>
          )
        )}

        {pageRange.includes(pagination.lastPage) || (
          <a href={`/#/customers?page=${pagination.lastPage}`} className='text-sm btn !px-2 block btn-blue'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>

      <div className='text-gray-700 ml-auto'>
        Exibindo de {pagination.from} a {pagination.to} de {pagination.total} clientes
      </div>
    </div>
  )
}

function Customers({customers, pagination, error}) {
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
      <PaginationInfo pagination={pagination} />

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

      <PaginationInfo pagination={pagination} />
    </div>
  )
}

export default function CustomerIndex(props) {
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({});

  const page = props.searchParams.get('page') || 1;

  useEffect(() => {
    client
      .get('/customers', {
        params: {
          search,
          page,
        }
      })
      .then(response => {
        setCustomers(response.data.data)
        setPagination({
          from: response.data['from'],
          to: response.data['to'],
          perPage: response.data['per_page'],
          currentPage: response.data['current_page'],
          lastPage: response.data['last_page'],
          total: response.data['total'],
        })
      })
      .catch(setError)
  }, [search, page]);

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

        <Customers customers={customers} pagination={pagination} error={error} />
      </div>
    </div>
  )
}
