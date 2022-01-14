export default function CustomerCreate() {
  return (
    <div>
      <h1>Criar cliente</h1>

      <form action="">
        <div>
          <label htmlFor="">
            Nome
          </label>

          <input type="text" />
        </div>

        <div>
          <label htmlFor="">
            CPF
          </label>

          <input type="text" />
        </div>

        <div>
          <label htmlFor="">
            E-mail
          </label>

          <input type="text" />
        </div>

        <div>
          <label htmlFor="">
            Telefone
          </label>

          <input type="text" />
        </div>

        <div>
          <label htmlFor="">
            Endereço
          </label>

          <input type="text" />
        </div>

        <div>
          <button>
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
