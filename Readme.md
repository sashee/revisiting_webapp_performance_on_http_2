# Revisiting webapp performance on HTTP/2

This is a comparison project on HTTP/2 and HTTP/1.1 in different scenarios. The goal is to quantify
the different techniques on webapp performance on each protocols and identify the best practices with
the coming standard.

For more info, check out the relevant blog post: https://advancedweb.hu/2015/09/01/revisiting_webapp_performance_on_http_2/

## Usage

You will need Docker installed, then build the image:

* _docker build ._

It will take a while. After the build is complete, start it with:

* _docker run -p 443:443 -p 444:444 \<image id\>_

Then with a browser, access the files and measure the differences. You should use a remote server as performance testing on localhost might be misleading.

The URL structure is the following:

* https://\<ip\>:\<443|444\>/\<gzip/nogzip\>/\<type\>

where type is one of:

* asis
* concat
* concat_minify
* concat_minify_mangle
* minify
* minify_mangle

Port 443 is a HTTP/1.1 web server (Apache) and 444 is HTTP/2 (H2O). The gzip effect can only be inspected
at port 444, as Apache always gzips the content in the current config.

## Performance technics

The following build types are currently supported:

* asis: There is no concatenation and minification whatsoever, the files are served as is
* concat: The files are concatenated only
* concat_minify: The files are concatenated and minified, but not mangled (the variable names are not shortened)
* concat_minify_mangle: Full concatenation, minification and mangling are performed
* minify: The files are minified separately, without concatenation
* minify_mangle: The files are minified and mangled separately

## The testing app

The client-side app contains several libraries, weighting almost 3 MBs. It should model a moderately
sized webapp and should be representative.
