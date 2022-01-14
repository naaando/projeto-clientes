import {useEffect, useState} from 'react';
import { client } from '../../client';

export default function CustomerIndex() {
  const [hasError, setHasError] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    client
      .get('/customers')
      .then(response => setList(response.data))
      .catch(setHasError)
  }, []);

  function renderList() {
    if (hasError) {
      return (
        <div>
          <p>
            Houve um erro
          </p>

          <p>
            {JSON.stringify(hasError)}
          </p>
        </div>
      )
    }

    if (list.length) {
      return (
        <ul>
          {list.map(i => <li>{i}</li>)}
        </ul>
      )
    }

    return (
      <small>A lista está vazia</small>
    )
  }

  return (
    <div>
      <h1>Lista de clientes</h1>

      <div>
        <a href='/#/customer/create'>
          Criar novo cliente
        </a>
      </div>

      {renderList()}
    </div>
  )
}
