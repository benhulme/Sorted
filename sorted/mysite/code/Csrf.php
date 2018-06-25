<?php

class Csrf {
    static function generate()
    {
        $token = md5('SECRET333'.uniqid());
        Session::set('csrf_token', $token);
        return $token;
    }

    static function check($token)
    {
        return $token === Session::get('csrf_token') AND Session::get('csrf_token') !== null;
    }
}
