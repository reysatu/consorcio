<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 7:00 PM
 */

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class MotivosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'descripcion' => 'required|min:3|max:255'
        ];
    }

    /**
     * @param Validator $validator
     * @return mixed
     */
    protected function formatErrors(Validator $validator)
    {
        return $validator->errors()->all();
    }

    /**
     * @param array $errors
     * @return JsonResponse
     */
    public function response(array $errors)
    {
        $errors = [
            'Result' => 'ERROR',
            'Message' => $errors
        ];
        return new JsonResponse($errors, 200);
    }
}