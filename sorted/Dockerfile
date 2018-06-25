FROM brettt89/silverstripe-web
# Install additional Apt components
RUN apt-get update -y && apt-get install -y \
   wget

RUN apt-get install nano

 # Install additional PHP extensions
RUN docker-php-ext-install -j$(nproc) \
   iconv

RUN a2enmod headers
