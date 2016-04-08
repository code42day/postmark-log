check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	echo No tests yet...
	# ./node_modules/.bin/mocha --recursive --require should

.PHONY: check lint test
