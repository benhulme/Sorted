<?php
class ApiBaseController extends Controller
{
    public function response(Array $body, $code = 200)
    {
        $response = new SS_HTTPResponse();
        $response->setStatusCode($code);

        $response->setBody(json_encode($body));
        $response->addHeader("Content-type", "application/json");

        return $response;
    }

    public function checkToken(SS_HTTPRequest $request)
    {
        if (false === Director::isLive()) return true;
        return Csrf::check($request->getHeader('X-Csrf-Token'));
    }

    public function error($message = '', $code = 500)
    {
        return $this->response(['status' => 'error', 'message' => $message], $code);
    }
}