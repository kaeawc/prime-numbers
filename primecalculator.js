/**
 * Calculates prime numbers
 * @class prime number calculator
 */
var PrimeCalculator = function() {
}

/**
 *
 * @param minimum Positive integer
 * @param maximum Integer greater than minimum
 * @return {Number} Sum of all primes between minimum and maximum
 */
PrimeCalculator.prototype.calcSum = function(minimum, maximum) {
	if(!minimum) throw {
		name:        "OutOfBoundsException",
		message:     "'minimum' must be a positive integer"
	};
	if(!maximum || maximum < minimum) throw {
		name:        "OutOfBoundsException",
		message:     "'maximum' must be a positive integer greater than 'minimum'"
	};

	var sum = 0;
	var current = minimum;

	if(current % 2 === 0) current++;

	while(current < maximum) {
		if(this.isPrime(current)) sum += current;
		current += 2;
	}

	return sum;
}

/**
 * Determines if 'n' is a prime number
 * @param n Integer to check
 * @return {Boolean}
 */
PrimeCalculator.prototype.isPrime = function(n) {
	//eliminate simple cases
	if (n === 1 || n === 2) return true;

	//if even, not prime
	if (n % 2 == 0)
		return false;

	//don't recalculate the limit over and over
	var limit = Math.sqrt(n);

	//determine if divisible by an odd number in a limited set
	for (var x = 3; x <= limit; x += 2) {
		if (n % x === 0) return false;
	}

	//n is a prime number
	return true;
}
