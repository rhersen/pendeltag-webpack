install:	pull mocha /opt/nginx/secure/webpack/bundle.js /opt/nginx/secure/webpack/index.html

pull:
	git pull

mocha:
	node_modules/.bin/mocha

bundle.js:	entry.js format.js style.css trains.hbs
	node_modules/.bin/webpack

/opt/nginx/secure/webpack/bundle.js:	bundle.js
	cp bundle.js /opt/nginx/secure/webpack/

/opt/nginx/secure/webpack/index.html:	index.html
	cp index.html /opt/nginx/secure/webpack/

