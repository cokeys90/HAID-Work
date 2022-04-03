


function chorusStringToNumber(num){
		num = num.replace("\\,", ""); // 세자리수 컴마 삭제
}

/**
	* 동적 자리수 맞추기
	* @param fixCount
	* @param num
	* @returns {string}
	*/
function currencyFormat(num, fixCount) {
		num = Number(num);
		if (num.toString().split(".").length > 1) { // 소수점으로 나뉘어져 있는 값일경우
				if (fixCount !== undefined && fixCount !== 0) {
						num = Number(num);
						num = num.toFixed(fixCount);
						return numberWithCommas(num);
				}
		}

		if (fixCount === undefined || fixCount === -1) { // 자리수 맞출 필요없을경우
				return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		}

		return num.toFixed(fixCount).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//세자리수 컴마
function numberWithCommas(x) {
		let parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
}


/*
*  수량 (소수점 아래 0 넣어주기)
*  1. BTC -> 소수점 8자리
*  2. 이외 -> 소수점 4자리
*  3. 수동 -> 원하는 소수점
*  return[] 0: 소수점 앞에, 1: 소수점 아래 원래값, 2: 소수점 아래 0추가된값
* */
function numberWithDot(arg, count) {
		let args = String(arg).split('.');
		let list = new Array();
		list.push(args[0]);
		if (args.length > 1) {
				if (args[1].length === count) { // 현재 소수점 자리수와 받고싶은 소수점 자리수가 동일할경우
						list.push(args[1]);
				} else if (args[1].length > count) {
						list.push(args[1].substring(0, count));
				} else if (args[1].length < count) {
						list.push(args[1]);

						let addCount = count - args[1].length;
						let add0Number = '';
						for (let idx = 0; idx < addCount; idx++) {
								add0Number += '0';
						}
						list.push(add0Number);
				} else {
						list.push(args[1]);
				}
		} else {
				if (count !== 0) {
						let add0Number = '';
						for (let idx = 0; idx < count; idx++) {
								add0Number += '0';
						}
						list.push(add0Number);
				}
		}

		return list;
}


// (중요) BTC 마켓 호가창 보여줄때 사용
// 지수 표기법 반대로 만들기
function longnumberstring(n) {
		n = parseFloat(n);
		let str, str2 = '', data = n.toExponential().replace('.', '').split(/e/i);
		str = data[0], mag = Number(data[1]);
		if (mag >= 0 && str.length > mag) {
				mag += 1;
				let result = str.substring(0, mag);
				let dotRightValue = str.substring(mag);
				if (dotRightValue.length > 0) {
						result += '.' + str.substring(mag);
				}
				console.log(result);
				return result;
		}
		if (mag < 0) {
				while (++mag) str2 += '0';
				let result = '0.' + str2 + str;
				console.log(result);
				return result;
		}
		mag = (mag - str.length) + 1;
		while (mag > str2.length) {
				str2 += '0';
		}
		let result = str + str2;
		console.log(result);
		return result;
}



// url 호출시 get 방식일때 파라미터 값 가져오기
function getParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function timestamp(arg) {
		let today = new Date(arg);
		today.setHours(today.getHours() + 9);
		return today.toISOString().replace('T', ' ').substring(0, 19);
}