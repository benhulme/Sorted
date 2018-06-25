<?php


class BookletDispatchTask extends BuildTask
{
    const FTP_SERVER = 'ftp.bluestargroup.co.nz';
    const FTP_USER = 'retcom'; //THIS USER IS LIVE NOW, DON"T ORDER OR IT WILL ORDER FOR REAL!
    const FTP_PASS = 'RE2014m';
    private $xml;  // XML to be sent to BlueStar
    private $stock_references = [
        '1000' => [ 'ref' => 'SORTED016', 'name' =>		'Set your goals' ],
        '1100' => [ 'ref' => 'SORTED073', 'name' =>     'Set your goals - Te Reo'],
        '1004' => [ 'ref' => 'SORTED026', 'name' =>		'Insurance' ],
        '1005' => [ 'ref' => 'SORTED022', 'name' =>		'Investing' ],
        '1007' => [ 'ref' => 'SORTED002', 'name' =>		'KiwiSaver' ],
        '1003' => [ 'ref' => 'SORTED019', 'name' =>		'Retirement planning' ],
        '1006' => [ 'ref' => 'SORTED018', 'name' =>		'Saving' ],
        '1106' => [ 'ref' => 'SORTED076', 'name' =>     'Saving - Te Reo' ],
        '1008' => [ 'ref' => 'SORTED020', 'name' =>		'Choice years' ],
        '1001' => [ 'ref' => 'SORTED021', 'name' =>		'Budgeting' ],
        '1101' => [ 'ref' => 'SORTED074', 'name' =>     'Budgeting - Te Reo'], 
        '1002' => [ 'ref' => 'SORTED017', 'name' =>		'Managing debt' ],
        '1102' => [ 'ref' => 'SORTED075', 'name' =>     'Managing debt - Te Reo' ],
        '1999' => [ 'ref' => 'SORTED025', 'name' =>		'Set of Sorted booklets' ],
        '1009' => [ 'ref' => 'SORTED055', 'name' =>		'Thinking of living in a retirement village' ]
    ];

    public function run($request)
    {
        $orders = Orders::get()->filter([
            'Sent' => 0
        ]);
        foreach ($orders as $order) {
            $xml = $this->xmlGenerate($order);            
            if ($this->uploadOrder($order, $xml) ) {
                $order->Sent = 1;
                $order->write();
            }

        }
        exit();
    }


    private function xmlGenerate($order) {
        $data = unserialize($order->Data);

        // Init vars
        $xml = '';
        $phoneDetails = '';

        // Construct the full name
        $nameFull = $data['User']['first_name'] . ' ' . $data['User']['family_name'];

        // Construct the phone details

        $phoneDetails = '';
        // Make address line out of available variables
        $address_line = $data['DeliverTo']['street_address']; //default for individuals.

        $company = '';
        if(isset($data['Organisation']['company_name'])){
            $company = $data['Organisation']['company_name'];
            if ($data['Organisation']['company_name'] !== '') {
                $address_line = $data['Organisation']['company_name'] . ', ' . $address_line;
            }
        }


        // Order details
        $xml .= $this->xmlElement('SH_CUST', 'RETCOM');
        $xml .= $this->xmlElement('SH_ADDRESS', $company);
        $xml .= $this->xmlElement('SH_SUBURB', $address_line);
        $xml .= $this->xmlElement('SH_CITY', $data['DeliverTo']['suburb_address']);
        $xml .= $this->xmlElement('SH_STATE', $data['DeliverTo']['town_city']);
        $xml .= $this->xmlElement('SH_COUNTRY', 'NEW ZEALAND');
        $xml .= $this->xmlElement('SH_POST_CODE', $data['DeliverTo']['post_code']);
        $xml .= $this->xmlElement('SH_CONTACT', $nameFull);
        $xml .= $this->xmlElement('SH_CONT_PHONE', $phoneDetails);
        $xml .= $this->xmlElement('SH_CONT_EMAIL', $data['User']['email']);
        $xml .= $this->xmlElement('SH_NOTE_1', '');
        $xml .= $this->xmlElement('SH_CUST_REF', $order->ID);
        $xml .= $this->xmlElement('SH_REQD_DATE', '');
        $xml .= $this->xmlElement('SH_DESC', '');

        // Loop through all ordered booklets
        foreach ($data['Items'] as $item_index => $item) {
            if (!array_key_exists($item_index, $this->stock_references))
            {
                SS_Log::log('Reference wasn\'t find: '.$item_index, SS_Log::ERR);
                continue;
            }
            // Init vars
            $productXML = '';

            // Product details
            $productXML .= $this->xmlElement('SD_EXT_REF', $item_index);
            // TODO: Change on hardcoded values
            $productXML .= $this->xmlElement('SD_STOCK', $this->stock_references[$item_index]['ref'] );
            $productXML .= $this->xmlElement('SD_QTY_ORDER', $item);
            $productXML .= $this->xmlElement('SD_DESC', $this->stock_references[$item_index]['name']);
            $productXML .= $this->xmlElement('SD_SELL_PRICE', '');

            // Add the product XML to the main XML as a child of a 'SalesDetail' element
            $xml .= $this->xmlElement('SalesDetail', "\n$productXML", False);
        }

        // Place the entire XML within a 'SalesHeader' element
        $xml = $this->xmlElement('SalesHeader', "\n$xml", False);
        // Place the entire XML within a 'SalesOrders' element
        $xml = $this->xmlElement('SalesOrders', "\n$xml", False);

        // Add the main XML tag
        return '<' . '?xml version="1.0" encoding="ISO-8859-1"?' . ">\n" . $xml;
    }



    private function xmlElement($name, $content, $specialChars = True)
    {
        // Init vars
        $element = '';

        // Encode the content
        $content = ($specialChars) ? $this->xmlSpecialChars($content) : $content;

        // If there IS content...
        if (!empty($content)) {
            // Create an element with content
            $element = sprintf("<%s>%s</%s>\n", $name, $content, $name);
            // If there is NOT content...
        } else {
            // Create a self-closing empty element
            $element = sprintf("<%s />\n", $name);
        }

        return $element;
    }

    private function xmlSpecialChars($text)
    {
        // Encode the text
        $text = str_replace('&#039;', '&apos;', htmlspecialchars($text, ENT_QUOTES));

        return $text;
    }

    private function uploadOrder($order, $xml)
    {
        // FTP CONNECTION //
        // Get an FTP connection
        $ftpConn = @ftp_connect(self::FTP_SERVER);

        // If we did NOT get a connection
        if (!$ftpConn) {
            // Log the error
            SS_Log::log('Failed to obtain connection to FTP server for order ', SS_Log::ERR);
            // Return False to indicate failure to send
            return False;
        }

        // Login; if it fails...
        if (!@ftp_login($ftpConn, self::FTP_USER, self::FTP_PASS)) {
            // Close the FTP connection
            ftp_close($ftpConn);
            // Log the error
            SS_Log::log('Failed to login to FTP server for order ', SS_Log::ERR);
            // Return False to indicate failure to send
            return FALSE;
        }


        // WRITE XML FILE //

        // If the order XML directory does NOT already exist...
        $temp_dir = sys_get_temp_dir() . '/' . uniqid();
        if (!is_dir($temp_dir)) {
            // Create the directory
            mkdir($temp_dir, 0755, True);
        }

        // Construct the file name
        $fileName = 'RETCOM_SO_' . $order->ID . '.xml';
        // Construct the full path
        //$filePath = '/var/www/sorted/xml/' . $fileName;
        $filePath = $temp_dir . '/' . $fileName;

        // Write to the file; if it fails...
        if (!file_put_contents($filePath, $xml, FILE_TEXT)) {
            // Close the FTP connection
            ftp_close($ftpConn);
            // Throw an exception (this is an actual problem; not just a temporary connection issue like above where we
            // just log and return, so we throw a proper error here).
            throw new Exception(t("Unable to write order XML to file '!file_path'; check the permissions.",
                array(
                    '!file_path' => $filePath,
                )));
        }


        // UPLOAD XML FILE //
        $upload = False;
        ftp_pasv($ftpConn, true);
        // If we are NOT in DEV mode...
       if (true) {
            // Attempt to upload the XML file
            $upload = ftp_put($ftpConn, $fileName, $filePath, FTP_ASCII);

        } else {
            // If we ARE in DEV mode...
            //echo $filePath.PHP_EOL;
            SS_Log::log('We are not in LIVE so doesn\'t upload file', SS_Log::INFO );
            SS_Log::log(print_r($xml, true), SS_Log::INFO );
        }

        // Close the FTP connection (we want this regardless of success or failure as we're done either way)
        ftp_close($ftpConn);

        // If uploading failed...
        if (!$upload) {
            // Log the error
            SS_Log::log('Failed to upload XML to FTP server. '. $php_errormsg, SS_Log::ERR);
            // Return False to indicate failure to send
            return FALSE;
        }
        // return inidcator of successful upload
        return TRUE;
    }
}
