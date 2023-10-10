lint:
	npx eslint src

test:
	npm run test src/test -- --verbose --watchAll=false 

test-coverage:
	npm run test src/test -- --coverage --watchAll=false --collectCoverageFrom=**/slices/**/*.ts

.PHONY: test
