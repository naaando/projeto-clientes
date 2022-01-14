<?php

use App\Models\Customer;
use Laravel\Lumen\Testing\DatabaseMigrations;

class CustomerTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Test customers listing starts empty.
     *
     * @return void
     */
    public function testCustomersStartsEmpty()
    {
        $this->json('GET', '/customers')->seeJson([
            'data' => []
        ]);
    }

    /**
     * List customers after creating one customer.
     *
     * @return void
     */
    public function testCustomersListing()
    {
        Customer::create([
            'name' => 'Teste',
            'cpf' => '18144484037',
            'email' => 'email@test.com',
            'tel' => '123456789',
            'address' => 'Endereço teste',
        ]);

        $this->json('GET', '/customers')
            ->seeJson([
                'total' => 1
            ])
            ->seeJson([
                'name' => 'Teste',
                'cpf' => '18144484037',
                'email' => 'email@test.com',
                'tel' => '123456789',
                'address' => 'Endereço teste',
            ]);
    }

    /**
     * Test customer creation endpoint.
     *
     * @return void
     */
    public function testCustomersCreation()
    {
        $this->json('POST', '/customers', [
            'name' => 'Teste',
            'cpf' => '68209501011',
            'email' => 'email@test.com',
            'tel' => '123456789',
            'address' => 'Endereço teste',
        ])->seeStatusCode(200);

        $this->json('GET', '/customers')->seeJson([
            'name' => 'Teste',
            'cpf' => '68209501011',
            'email' => 'email@test.com',
            'tel' => '123456789',
            'address' => 'Endereço teste',
        ]);
    }

    /**
     * Test customer creation endpoint.
     *
     * @return void
     */
    public function testCustomersUpdate()
    {
        Customer::create([
            'name' => 'Teste',
            'cpf' => '18144484037',
            'email' => 'email@test.com',
            'tel' => '123456789',
            'address' => 'Endereço teste',
        ]);

        $this->json('PUT', '/customers/1', [
            'name' => 'Update name',
            'cpf' => '71869794087',
            'email' => 'new@email.com',
            'tel' => '234567891',
            'address' => 'Endereço 2',
        ])->seeStatusCode(200);

        $this->json('GET', '/customers/1')->seeJson([
            'name' => 'Update name',
            'cpf' => '71869794087',
            'email' => 'new@email.com',
            'tel' => '234567891',
            'address' => 'Endereço 2',
        ]);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCustomersDelete()
    {
        Customer::create([
            'name' => 'Teste',
            'cpf' => '18144484037',
            'email' => 'email@test.com',
            'tel' => '123456789',
            'address' => 'Endereço teste',
        ]);

        $this->json('DELETE', '/customers/1')->seeStatusCode(200);
        $this->json('GET', '/customers/1')->seeStatusCode(404);

        // Attempt to delete inexistent customer
        $this->json('DELETE', '/customers/1')->seeStatusCode(404);
    }
}
