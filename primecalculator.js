/**
 * Calculates prime numbers
 * @class prime number calculator
 */
var PrimeCalculator = function() {

};

/**
 *
 * @param minimum lowest possible prime number
 * @param maximum highest possible prime number
 * @param limit limits the sum
 * @return {Number} Sum of all primes between minimum and maximum, optionally limited
 */
PrimeCalculator.prototype.getRange = function(minimum, maximum, limit) {
	if(!minimum) throw {
		name:        "OutOfBoundsException",
		message:     "'minimum' must be a positive integer"
	};
	if(!maximum || maximum < minimum) throw {
		name:        "OutOfBoundsException",
		message:     "'maximum' must be a positive integer greater than 'minimum'"
	};

	var range= {sum:0,list:[]};
	var current = minimum;

	while(current < maximum) {

		if(this.isPrime(current)) {
			var newSum = range.sum + current;
			if(limit && newSum > limit) break;
			range.sum += current;
			range.list.push(current);
		}

		if(current > 2) current += 2;
		else current++;
	}

	return range;
};

/**
 *
 * @param minimum lowest possible prime number
 * @param maximum highest possible prime number
 * @param limit limits the sum
 * @return {*} prime sum of largest range under the given limit
 */
PrimeCalculator.prototype.primeSum = function(minimum,maximum,limit) {
	var range = this.getRange(minimum,maximum,limit);

	var len = range.list.length;
	var removed = 0;

	//if you've removed the list there isn't anything left to check
	while(removed < len) {

		//the minimum index will increase as the maximum index does
		//each run of this loop will have the same number of 'removed' elements
		for(var r = 0; r <= removed; r++){
			var filtered = this.filterList(range.list,r,len - (removed - r));
			var sum = this.sumList(filtered);

			//check the sum of the filtered list
			if(this.isPrime(sum)) return sum;
		}
		removed++;
	}

	return false;
};

/**
 *
 * @param list array to filter
 * @param min starting index
 * @param max ending index
 * @return {Number}
 */
PrimeCalculator.prototype.filterList = function(list, min, max) {
	if(max > list.length)
		throw {
			name:'',
			message:''
		}
	if(min === max) return 0;
	var filtered = [];
	for(var i = min; i < max ; i++) {
		filtered.push(list[i]);
	}

	return filtered;
};

/**
 *
 * @param list Array of numbers to sum
 * @return {Number} Sum of array's elements
 */
PrimeCalculator.prototype.sumList = function(list) {
	var sum = 0;
	for(var i = 0; i < list.length; i++) {
		sum += list[i];
	}

	return sum;
};

/**
 *
 * @param n Integer to check
 * @return {Boolean} Whether 'n' is a prime number
 */
PrimeCalculator.prototype.isPrime = function(n) {
	//eliminate simple cases
	if (n < 2) return false;
	if (n === 2) return true;

	//if even, not prime
	if (n % 2 === 0)
		return false;

	//don't recalculate the limit over and over
	var limit = Math.sqrt(n);

	//determine if divisible by an odd number in a limited set
	for (var x = 3; x <= limit; x += 2) {
		if (n % x === 0) return false;
	}

	//n is a prime number
	return true;
};