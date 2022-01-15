import { useState } from "react"
import { client } from "../../client";

function PresentErrorFields({error}) {
  const translatedFields = {
    'name': 'Nome',
    'cpf': 'CPF',
    'email': 'E-mail',
    'tel': 'Telefone',
    'address': 'Endereço',
  }

  const translatedData = Object.fromEntries(
    Object
      .entries(error.response.data)
      .map(([k, v]) => [translatedFields[k] || k, v])
  );

  return Object
    .entries(translatedData)
    .map(([index, value]) => (
      <p className="text-left">
        <span className="font-bold mr-1">{index}:</span>
        {value}
      </p>
    ))
}

export default function CustomerCreate() {
  const [customer, setCustomer] = useState({
    name: '',
    cpf: '',
    email: '',
    tel: '',
    address: '',
  });

  const [error, setError] = useState(null);

  function handleFormSubmit(event) {
    event.preventDefault();
    client
      .post('/customers', customer)
      .then(() => page('/#/customer'))
      .catch((e) => setError(e))
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setCustomer({...customer, [name]: value})
  }

  return (
    <div>
      <h1 className="heading-1 text-left p-3 bg-gray-800 text-white">
        Criar cliente
      </h1>

      {error && (
        <div className="container mx-auto md:w-2/3">
          <div className=" bg-red-200 rounded mx-6 p-3 my-3">
            <p className="font-bold text-center pb-3">
              Houveram erros durante a submissão
            </p>

            <PresentErrorFields error={error} />
          </div>
        </div>
      )}

      <form className="container flex flex-wrap md:w-2/3 mx-auto p-5" onSubmit={handleFormSubmit}>
        <div className="w-full sm:w-1/2 md:w-2/3 p-2">
          <label
            htmlFor="name"
            className="block text-left"
          >
            Nome
          </label>

          <input
            id="name"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
            type="text"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 p-2">
          <label
            htmlFor="cpf"
            className="block text-left"
          >
            CPF
          </label>

          <input
            id="cpf"
            name="cpf"
            value={customer.cpf}
            onChange={handleInputChange}
            type="text"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/2 p-2">
          <label
            htmlFor="email"
            className="block text-left"
          >
            E-mail
          </label>

          <input
            id="email"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            type="text"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/2 p-2">
          <label
            htmlFor="tel"
            className="block text-left"
          >
            Telefone
          </label>

          <input
            id="tel"
            name="tel"
            value={customer.tel}
            onChange={handleInputChange}
            type="text"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-full p-2">
          <label
            htmlFor="address"
            className="block text-left"
          >
            Endereço
          </label>

          <input
            id="address"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
            type="text"
            className="w-full"
          />
        </div>

        <div className="w-full flex flex-wrap align-bottom justify-end">
          <div className="w-full sm:w-auto p-2">
            <a href="/#/customer/" className="btn btn-red block w-full">
              Cancelar
            </a>
          </div>

          <div className="w-full sm:w-auto p-2">
            <button className="btn btn-blue block w-full">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
