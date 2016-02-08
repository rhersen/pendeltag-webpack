install:	pull mocha /opt/nginx-1.2.8/webpack/bundle.js /opt/nginx-1.2.8/webpack/index.html

pull:
	git pull

mocha:
	node_modules/.bin/mocha

bundle.js:	entry.js format.js style.css
	node_modules/.bin/webpack

/opt/nginx-1.2.8/webpack/bundle.js:	bundle.js
	mv bundle.js /opt/nginx-1.2.8/webpack/

/opt/nginx-1.2.8/webpack/index.html:	index.html
	mv index.html /opt/nginx-1.2.8/webpack/

