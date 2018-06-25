# Standing up the Sorted development environment

## Clone Repository

```
$ git clone git@bitbucket.org:sortednz/sorted.git
```

Default branch is `unstable` (feature branches are created from this).


## Front-end

```
$ cd sorted/sorted/angular
$ npm install
$ bower install
$ gulp
```

The gulp default task does lint, sass, Angular injection into index, and starts a watch on JS and SCSS files, serving with LiveReload. There are various other utility tasks.


## Virtual Machine (sorted.dev)

In the root project directory (with the Vagrantfile):

```
$ vagrant up
```

There may be issues with Composer causing a failed install. Try:

```
$ vagrant ssh
$ cd /vagrant/sorted
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar install
```

The VM can be accessed at `sorted.dev`. SilverStripe admin is `sorted.dev/admin`, user `admin`, pass `admin`.

When in doubt, try visiting `sorted.dev/dev/build` which rebuilds the database. Adding a `?flush=1` flushes the cache. (An individual page's cache can be flushed by adding `?flush=1` to its URL without rebuilding the entire site.)

The task `gulp build-prod` can be used to build the front-end components out to the VM after changes.

## Staging

The staging server is at [https://sorted-int.digitalstaging.co.nz](https://sorted-int.digitalstaging.co.nz).

## Production build
```
$ cd sorted/angular
$ gulp build
$ gulp prod-build
```