FROM ubuntu:15.04

## Building H2O from source

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y libtool automake libyaml-dev libssl-dev cmake git build-essential

WORKDIR /tmp
RUN git clone https://github.com/h2o/h2o.git
RUN git clone https://github.com/libuv/libuv.git

# Build last version of libuv
WORKDIR /tmp/libuv
RUN sh autogen.sh && ./configure && make && make install

# Build h2o HTTP server
WORKDIR /tmp/h2o
RUN cmake -DWITH_BUNDLED_SSL=on .
RUN make && make install

RUN mv /tmp/h2o/examples/h2o /etc/h2o
RUN mkdir /var/www

# Clean source
RUN rm -rf /tmp/h2o
RUN rm -rf /tmp/libuv

## H2o build until here

## Installing nodejs and other stuff

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y apache2 git build-essential nodejs

## Configuring Apache

RUN a2enmod headers
RUN a2enmod ssl
RUN a2enmod rewrite

ADD ssl/apache.crt /etc/ssl/apache.crt
ADD ssl/apache.key /etc/ssl/apache.key
ADD ssl/default-ssl.conf /etc/apache2/sites-enabled/default-ssl.conf
ADD apache_config /etc/apache2/sites-enabled/

## Preparing the main script

ADD includes/run.sh /run.sh
RUN chmod +x /run.sh

## H2O config

ADD h2o.conf /etc/h2o/h2o.conf

## Install build prerequisities

RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g bower-installer

## Adding and initializing app build

ADD app /app
WORKDIR /app

RUN npm install
RUN bower-installer --allow-root

ADD gruntfiles /gruntfiles

## Initializing target directories

RUN mkdir /var/www/nogzip && mkdir /var/www/gzip

## Running the builds

RUN cp /gruntfiles/asis/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/asis
RUN cp /gruntfiles/concat/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/concat
RUN cp /gruntfiles/concat_minify/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/concat_minify
RUN cp /gruntfiles/concat_minify_mangle/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/concat_minify_mangle
RUN cp /gruntfiles/minify/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/minify
RUN cp /gruntfiles/minify_mangle/Gruntfile.js /app && grunt && cp -R /app/dist /var/www/nogzip/minify_mangle

## Populating the gzip directory with the same content

RUN cp -a /var/www/nogzip/. /var/www/gzip

## Running gzip on the assets

RUN find /var/www/gzip -type f ! -name '*.gz' -exec gzip -k "{}" \;

## And done!

EXPOSE 443 444

CMD ["/run.sh"]