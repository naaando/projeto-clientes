export default function CustomerCreate() {
  return (
    <div>
      <h1 className="heading-1 text-left p-3 bg-gray-800 text-white">
        Criar cliente
      </h1>

      <form className="container flex flex-wrap md:w-2/3 mx-auto p-5">

        <div className="w-full sm:w-1/2 md:w-2/3 p-2">
          <label htmlFor="" className="block text-left">
            Nome
          </label>

          <input type="text" className="w-full" />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 p-2">
          <label htmlFor="" className="block text-left">
            CPF
          </label>

          <input type="text" className="w-full" />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/2 p-2">
          <label htmlFor="" className="block text-left">
            E-mail
          </label>

          <input type="text" className="w-full" />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/2 p-2">
          <label htmlFor="" className="block text-left">
            Telefone
          </label>

          <input type="text" className="w-full" />
        </div>

        <div className="w-full sm:w-1/2 md:w-full p-2">
          <label htmlFor="" className="block text-left">
            Endereço
          </label>

          <input type="text" className="w-full" />
        </div>

        <div className="w-full flex flex-wrap align-bottom justify-end">
          <div className="p-2">
            <a href="/#/customer/" className="btn btn-red block">
              Cancelar
            </a>
          </div>

          <div className="p-2">
            <button className="btn btn-blue">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
