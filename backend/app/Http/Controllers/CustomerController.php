<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $customer = Customer::query();

        if ($search = $request->input('search')) {
            $searchLike = "%" . implode('%', explode(' ', $search)) . "%";

            $customer
                ->where('name', 'like', $searchLike)
                ->orWhere('cpf', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhere('address', 'like', "%$search%");
        }

        return $customer->paginate($request->input('perPage', 10));
    }

    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    public function store(Request $request, $id = null)
    {
        $this->validate($request, [
            'name'    => 'required|min:3',
            // 'cpf'     => 'required|cpf',
            'email'   => 'required|email',
            'tel'     => 'required|min:3',
            'address' => 'required|min:3',
        ]);

        if ($id) {
            return Customer::find($id)
                ->fill($request->all())
                ->saveOrFail();
        }

        return Customer::create($request->all());
    }

    public function delete($id)
    {
        $c = Customer::findOrFail($id);
        return $c->delete($id);
    }
}
