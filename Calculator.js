const
	none = "0",
	plus = "+",
	minus = "-",
	mult = "x",
	divide = "÷";
var right = "0",
	left = "0",
	symbolFlag = none,
	rightflag = false,
	addDot = true,
	result = true;

//this function update the display.
function refresh(a) {

	if (a == -1)//when divide by 0. 
	{
		clear();
		$(".textview").attr("value", "MATH ERROR");
	}
	else {
		var str = left;
		if (symbolFlag != none)
			str += symbolFlag;
		if (rightflag)
			str += right;
		$(".textview").attr("value", str);
	}
};

//this function adds numbers
function add(a, b) {
	if (b == '.') {//if . is the "number"
		if (addDot) {//if we didnt add dot yet to this number
			addDot = false;
			a += b;
		}
	}
	else if (b == '0' && !addDot)//if b is 0 and there is a dot add the 0
		a += b;
	else {
		a = parseFloat(a + b).toString();
	}
	return a;
};

//clear the display.
function clear() {
	right = "0";
	left = "0";
	symbolFlag = none;
	rightflag = false;
	result = false;
};
//calc will calculate the resultof left [op] right 
function calc() {
	let x = 0;
	right = parseFloat(right);

	switch (symbolFlag) {
		case (plus):
			left = left + right;
			break;

		case (minus):
			left = left - right;
			break;

		case (mult):
			left = left * right;
			break;

		case (divide):
			if (right == 0) {
				x = -1;
			}
			else
				left = left / right;
			break;

	};
	right = "0";
	rightflag = false;
	return x;
};

$("document").ready(function () {

	$(".numbut").click(function () {
		if (result == true)//if we pressed equal and then pressed a number 
			clear();
		if (symbolFlag == none) {
			left = add(left, this.innerHTML);
		}
		else {
			rightflag = true;
			right = add(right, this.innerHTML);
		}
		refresh(0);

	});

	$(".comBut").click(function (e) {
		var x = 0;
		result = false;
		addDot = true;
		left = parseFloat(left);
		var id = $(this).attr("id");
		if (rightflag && id != "cancel") {
			x = calc();
		}

		switch (id) {
			case ("plus"):
				symbolFlag = plus;
				break;
			case ("minus"):
				symbolFlag = minus;
				break;
			case ("multiply"):
				symbolFlag = mult;
				break;
			case ("divide"):
				symbolFlag = divide;
				break;
			case ("cancel"):
				clear();
				break;
			case ("equalBut"):
				symbolFlag = none;
				result = true;
				break;

		}
		refresh(x);
	});

});