install:	pull /opt/nginx-1.2.8/webpack/bundle.js

pull:
	git pull

bundle.js:	entry.js
	node_modules/.bin/webpack

/opt/nginx-1.2.8/webpack/bundle.js:	bundle.js
	mv bundle.js /opt/nginx-1.2.8/webpack/

