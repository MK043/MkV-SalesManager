function calculate(){

var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;


	if (jq('#amount').val() == 0 || jq('#cost').val() == 0)
	return false;
	
	//jq('#amount,#cost').bind('keyup', function(){
	//this.value = jq(this).val().replace(',', '.');
	//})

//Если бензиновый
if (jq('#dv-1').attr('checked')){

	a = jq('#amount').val();
	b = jq('#cost').val();

	if (isNaN(a)||isNaN(b))
	return false;
	
	if (jq('#kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();
	
	//c = jq('#kurs').val();

	cb = c * b;
	cbo = (c * b).toFixed(2);
	cbo2 = (cbo * 0.1).toFixed(2);
	
	jq('#a-1').html(cbo+' грн.');
	jq('#a-2').html('10%');
	jq('#a-3').html(cbo2+' грн.');
	
	if (a <= 1000){
		a2 = 0.102;
	};
	if (a > 1000 && a <= 1500){
		a2 = 0.063;
	};
	if (a > 1500 && a <= 2200){
		a2 = 0.267;
	};
	if (a > 2200 && a <= 3000){
		a2 = 0.276;
	};
	if (a > 3000){
		a2 = 2.209;
	};
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#b-1').html(a + ' см3');
	jq('#b-2').html(a2 + ' EUR');
	jq('#b-3').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#c-1').html(cbocbo2 + ' грн.')
	jq('#c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#c-3').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	};
	
//Если дизельный
if (jq('#dv-2').attr('checked')){

	a = jq('#amount').val();
	b = jq('#cost').val();
	
	if (isNaN(a)||isNaN(b))
	return false;
	
	if (jq('#kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();
	
	//c = jq('#kurs').val();

	cb = c * b;
	cbo = (c * b).toFixed(2);
	cbo2 = (cbo * 0.1).toFixed(2);
	
	jq('#a-1').html(cbo+' грн.');
	jq('#a-2').html('10%');
	jq('#a-3').html(cbo2+' грн.');
	
	if (a <= 1500){
		a2 = 0.103;
	};
	if (a > 1500 && a <= 2500){
		a2 = 0.327;
	};
	if (a > 2500){
		a2 = 2.209;
	};
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#b-1').html(a + ' см3');
	jq('#b-2').html(a2 + ' EUR');
	jq('#b-3').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#c-1').html(cbocbo2 + ' грн.')
	jq('#c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#c-3').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	};

};


function calculate2(){
	
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var kvtch = 0;

//Если легковой
if (jq('#form-e #dv-1g').attr('checked')){
	
if (jq('#form-e #costg').val() == '' || jq('#form-e #kvtch').val() == ''){
	if(jq('#form-e #costg').val() == ''){
		jq('#form-e #costg').addClass('red');
	}
	if(jq('#form-e #kvtch').val() == ''){
		jq('#form-e #kvtch').addClass('red');
	}
	return false;
}

b = jq('#form-e #costg').val();

if (isNaN(b))
return false;

	if (jq('#form-e #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	
	jq('#form-e #a-1').html(cbo+' грн.');
	jq('#form-e #a-2').html('0%');
	jq('#form-e #a-3').html(cbo2+' грн.');
	
	
	
	
	if (jq('#kvtch').val() != ''){
		kvtch = jq('#kvtch').val();
	}
	
	a2 = kvtch;
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-e #b-1').html(kvtch + '<span class="br"><br /></span> кВт*ч');
	jq('#form-e #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-e #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-e #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	//jq('#form-e #c-2').html('0%');
	jq('#form-e #c-2').html('20%');
	
	//cbocbo22 = cbocbo2 * 0;
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-e #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-e #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-e #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-e #link').show();
	jq('#form-e .proposition').show();
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-e table tr td.th1, #content #form-e table tr td.th2').width(jq('#content #form-e .result').width());
	}
	
};

//Если грузовой и физ.лицо
if (jq('#form-e #dv-2g').attr('checked') && jq('#form-e #dv-1a').attr('checked')){
	
	if (jq('#form-e #costg').val() == 0)
	return false;

	b = jq('#form-e #costg').val();

	if (isNaN(b))
	return false;

	if (jq('#form-e #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 =Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-e #a-1').html(cbo+' грн.');
	jq('#form-e #a-2').html('10%');
	jq('#form-e #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-e #b-1').html('0%');
	jq('#form-e #b-2').html(a2 + ' EUR');
	jq('#form-e #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-e #c-1').html(cbocbo2 + ' грн.')
	jq('#form-e #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-e #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-e #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-e #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-e #link').show();
	jq('#form-e .proposition').show();
	
};

//Если грузовой, юр.лицо и нет EUR.1 (то же, что и выше)
if (jq('#form-e #dv-2g').attr('checked') && jq('#form-e #dv-1b').attr('checked')){
	
	if (jq('#form-e #costg').val() == 0)
	return false;

	b = jq('#form-e #costg').val();

	if (isNaN(b))
	return false;

	if (jq('#form-e #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 =Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-e #a-1').html(cbo+' грн.');
	jq('#form-e #a-2').html('10%');
	jq('#form-e #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-e #b-1').html('0%');
	jq('#form-e #b-2').html(a2 + ' EUR');
	jq('#form-e #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-e #c-1').html(cbocbo2 + ' грн.')
	jq('#form-e #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-e #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-e #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-e #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-e #link').show();
	jq('#form-e .proposition').show();
	
};

//Если грузовой, юр.лицо и есть EUR.1
if (jq('#form-e #dv-2g').attr('checked') && jq('#form-e #dv-2b').attr('checked')){
	
	if (jq('#form-e #costg').val() == 0)
	return false;

	b = jq('#form-e #costg').val();

	if (isNaN(b))
	return false;

	if (jq('#form-e #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#form-e #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-e #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	//cbo2 = cbo * 0.025;
	cbo2 = cbo * 0;
	cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-e #a-1').html(cbo+' грн.');
	//jq('#form-e #a-2').html('2.5%');
	jq('#form-e #a-2').html('0%');
	jq('#form-e #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-e #b-1').html('0%');
	jq('#form-e #b-2').html(a2 + ' EUR');
	jq('#form-e #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-e #c-1').html(cbocbo2 + ' грн.')
	jq('#form-e #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-e #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-e #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-e #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-e #link').show();
	jq('#form-e .proposition').show();
	
}

};

function calculate3(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

if (jq('#form-m #amountd').hasClass('no-active')){
	jq('#form-m #amountd').val('').removeClass('no-active').addClass('red');
}
	
if (jq('#form-m #amountd').val() == '' || jq('#form-m #costd').val() == ''){
	if (jq('#form-m #amountd').hasClass('no-active')){
		jq('#form-m #amountd').val('').removeClass('no-active').addClass('red');
	}
	if(jq('#form-m #amountd').val() == ''){
		jq('#form-m #amountd').removeClass('no-active').addClass('red');
	}
	if(jq('#form-m #costd').val() == ''){
		jq('#form-m #costd').addClass('red');
	}
	return false;
}

//Если физ.лицо или нет EUR.1
if (jq('#form-m #dv-1ad').attr('checked') || jq('#form-m #dv-1bd').attr('checked')){
		
if (jq('#form-m #costd').val() == 0)
return false;


a = jq('#form-m #amountd').val();
b = jq('#form-m #costd').val();

if (isNaN(b))
return false;

if (jq('#form-m #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-m #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-m #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

c2 = jq('#kurs').val();



	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-m #a-1').html(cbo+' грн.');
	jq('#form-m #a-2').html('10%');
	jq('#form-m #a-3').html(cbo2+' грн.');
	
	if (a <= 50){
		a2 = 0.062;
	};
	if (a > 50 && a <= 125){
		a2 = 0.062;
	};
	if (a > 125 && a <= 500){
		a2 = 0.062;
	};
	if (a > 500 && a <= 800){
		a2 = 0.443;
	};
	if (a > 800){
		a2 = 0.447;
	};
	
	
	aa2o = a * a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	//console.log(aa2o+'- aa2o');
	
	jq('#form-m #b-1').html(a + '<span class="br"><br /></span> см3');
	jq('#form-m #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-m #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-m #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-m #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-m #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
	sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-m #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-m #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-m #link').show();
	jq('#form-m .proposition').show();
		
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-m table tr td.th1, #content #form-m table tr td.th2').width(jq('#content #form-m .result').width());
	}
	
	};
	
	
	
	//Если есть сертификат EUR.1
	if (jq('#form-m #dv-2bd').attr('checked')){
		
if (jq('#form-m #costd').val() == 0)
return false;


a = jq('#form-m #amountd').val();
b = jq('#form-m #costd').val();

if (isNaN(b))
return false;

if (jq('#form-m #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-m #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-m #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-m #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

c2 = jq('#kurs').val();
		
	if (a <= 50){
		a2 = 0.062;
		d = 0;
		d2 = '0%';
	};
	if (a > 50 && a <= 125){
		a2 = 0.062;
		d = 0;
		d2 = '0%';
	};
	if (a > 125 && a <= 500){
		a2 = 0.443;
		d = 0;
		d2 = '0%';
	};
	if (a > 500 && a <= 800){
		a2 = 0.443;
		d = 0;
		d2 = '0%';
	};
	if (a > 800){
		a2 = 0.447;
		d = 0;
		d2 = '0%';
	};

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * d;
	cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-m #a-1').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-m #a-2').html(d2);
	jq('#form-m #a-3').html(cbo2+'<span class="br"><br /></span> грн.');
	
	aa2o = a * a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-m #b-1').html(a + '<span class="br"><br /></span> см3');
	jq('#form-m #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-m #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-m #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-m #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-m #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
	sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-m #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-m #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-m #link').show();
	jq('#form-m .proposition').show();
		
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-m table tr td.th1, #content #form-m table tr td.th2').width(jq('#content #form-m .result').width());
	}
		
		
	};
	
};

function calculate4(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;


if (jq('#form-t #costgt').val() == ''){
	if(jq('#form-t #costgt').val() == ''){
		jq('#form-t #costgt').addClass('red');
	}
	return false;
}

//Если новый
if (jq('#form-t #dv-1gt').attr('checked')){
	
	//Если юр.лицо
	if (jq('#form-t #dv-2at').attr('checked')){
		
		



//a = jq('#form-m #amountd').val();
b = jq('#form-t #costgt').val();


if (isNaN(b))
return false;

if (jq('#form-t #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;;
	
	jq('#form-t #a-1').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t #a-2').html('0%');
	jq('#form-t #a-3').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t #b-1').html('0%');
	jq('#form-t #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-t #link').show();
	jq('#form-t .proposition').show();

	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t table tr td.th1, #content #form-t table tr td.th2').width(jq('#content #form-t .result').width());
	}
		
	};
	
	
		//Если физ.лицо
if (jq('#form-t #dv-1at').attr('checked')){
		
		
if (jq('#form-t #costgt').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t #costgt').val();

if (isNaN(b))
return false;

if (jq('#form-t #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t #a-1').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t #a-2').html('10%');
	jq('#form-t #a-3').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t #b-1').html('0%');
	jq('#form-t #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t #d-1').html(sum + '<span class="br"><br /></span> грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-t #link').show();
	jq('#form-t .proposition').show();

	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t table tr td.th1, #content #form-t table tr td.th2').width(jq('#content #form-t .result').width());
	}
		
	};
		
};
	
	
//Если б/у
if (jq('#form-t #dv-2gt').attr('checked')){
	
		
		//Если физ.лицо
if (jq('#form-t #dv-1at').attr('checked')){

if (jq('#form-t #costgt').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t #costgt').val();

if (isNaN(b))
return false;

if (jq('#form-t #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t #a-1').html(cbo+' грн.');
	jq('#form-t #a-2').html('10%');
	jq('#form-t #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t #b-1').html('0%');
	jq('#form-t #b-2').html(a2 + ' EUR');
	jq('#form-t #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t #c-1').html(cbocbo2 + ' грн.')
	jq('#form-t #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-t #link').show();
	jq('#form-t .proposition').show();
		
	};
	
	//Если юр.лицо с EUR.1
	if (jq('#form-t #dv-2at').attr('checked') && jq('#form-t #dv-2bt').attr('checked')){
		
		
		
		
if (jq('#form-t #costgt').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t #costgt').val();

if (isNaN(b))
return false;

if (jq('#form-t #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;;
	
	jq('#form-t #a-1').html(cbo+' грн.');
	jq('#form-t #a-2').html('0%');
	jq('#form-t #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t #b-1').html('0%');
	jq('#form-t #b-2').html(a2 + ' EUR');
	jq('#form-t #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t #c-1').html(cbocbo2 + ' грн.')
	jq('#form-t #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;;
	
	jq('#form-t #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;;
	jq('#form-t #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-t #link').show();
	jq('#form-t .proposition').show();
	
	};
	
	//Если юр.лицо без EUR.1
	if (jq('#form-t #dv-2at').attr('checked') && jq('#form-t #dv-1bt').attr('checked')){
		
		
		
		
if (jq('#form-t #costgt').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t #costgt').val();

if (isNaN(b))
return false;

if (jq('#form-t #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t #a-1').html(cbo+' грн.');
	jq('#form-t #a-2').html('10%');
	jq('#form-t #a-3').html(cbo2+' грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t #b-1').html('0%');
	jq('#form-t #b-2').html(a2 + ' EUR');
	jq('#form-t #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t #c-1').html(cbocbo2 + ' грн.')
	jq('#form-t #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t #c-3').html(cbocbo22 + ' грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;;
	jq('#form-t #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-t #link').show();
	jq('#form-t .proposition').show();
	
	};
	
	
};


};

/**/
function calculate4copy(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

if (jq('#form-t-copy #costgt-copy').val() == ''){
	if(jq('#form-t-copy #costgt-copy').val() == ''){
		jq('#form-t-copy #costgt-copy').addClass('red');
	}
	return false;
}

//Если новый
if (jq('#form-t-copy #dv-1gt-copy').attr('checked')){
	
	//Если юр.лицо
	if (jq('#form-t-copy #dv-2at-copy').attr('checked')){
		


//a = jq('#form-m #amountd').val();
b = jq('#form-t-copy #costgt-copy').val();

if (isNaN(b))
return false;

if (jq('#form-t-copy #kurs-EUR-copy').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-USD-copy').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-PLN-copy').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t-copy #a-1-copy').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t-copy #a-2-copy').html('0%');
	jq('#form-t-copy #a-3-copy').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t-copy #b-1-copy').html('0%');
	jq('#form-t-copy #b-2-copy').html(a2 + ' EUR');
	jq('#form-t-copy #b-3-copy').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t-copy #c-1-copy').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t-copy #c-3-copy').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t-copy #d-1-copy').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');

	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t-copy table tr td.th1, #content #form-t-copy table tr td.th2').width(jq('#content #form-t-copy .result').width());
	}
		
	};
	
	
		//Если физ.лицо
if (jq('#form-t-copy #dv-1at-copy').attr('checked')){
		
		
if (jq('#form-t-copy #costgt-copy').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t-copy #costgt-copy').val();

if (isNaN(b))
return false;

if (jq('#form-t-copy #kurs-EUR-copy').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-USD-copy').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t #cur-copy').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-PLN-copy').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t-copy #a-1-copy').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t-copy #a-2-copy').html('10%');
	jq('#form-t-copy #a-3-copy').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t-copy #b-1-copy').html('0%');
	jq('#form-t-copy #b-2-copy').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t-copy #b-3-copy').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t-copy #c-1-copy').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t-copy #c-3-copy').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t-copy #d-1-copy').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');

	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t-copy table tr td.th1, #content #form-t-copy table tr td.th2').width(jq('#content #form-t-copy .result').width());
	}
		
	};
		
};
	
	
//Если б/у
if (jq('#form-t-copy #dv-2gt-copy').attr('checked')){
	
		
		//Если физ.лицо
if (jq('#form-t-copy #dv-1at-copy').attr('checked')){

if (jq('#form-t-copy #costgt-copy').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t-copy #costgt-copy').val();

if (isNaN(b))
return false;

if (jq('#form-t-copy #kurs-EUR-copy').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-USD-copy').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-PLN-copy').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t-copy #a-1-copy').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t-copy #a-2-copy').html('10%');
	jq('#form-t-copy #a-3-copy').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t-copy #b-1-copy').html('0%');
	jq('#form-t-copy #b-2-copy').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t-copy #b-3-copy').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t-copy #c-1-copy').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;;
	
	jq('#form-t-copy #c-3-copy').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t-copy #d-1-copy').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;;
	jq('#form-t-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t-copy table tr td.th1, #content #form-t-copy table tr td.th2').width(jq('#content #form-t-copy .result').width());
	}
		
	};
	
	//Если юр.лицо с EUR.1
	if (jq('#form-t-copy #dv-2at-copy').attr('checked') && jq('#form-t-copy #dv-2bt-copy').attr('checked')){
		
		
		
		
if (jq('#form-t-copy #costgt-copy').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t-copy #costgt-copy').val();

if (isNaN(b))
return false;

if (jq('#form-t-copy #kurs-EUR-copy').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-USD-copy').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-PLN-copy').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t-copy #a-1-copy').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t-copy #a-2-copy').html('0%');
	jq('#form-t-copy #a-3-copy').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t-copy #b-1-copy').html('0%');
	jq('#form-t-copy #b-2-copy').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t-copy #b-3-copy').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t-copy #c-1-copy').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t-copy #c-3-copy').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t-copy #d-1-copy').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t-copy table tr td.th1, #content #form-t-copy table tr td.th2').width(jq('#content #form-t-copy .result').width());
	}
	};
	
	//Если юр.лицо без EUR.1
	if (jq('#form-t-copy #dv-2at-copy').attr('checked') && jq('#form-t-copy #dv-1bt-copy').attr('checked')){
		
		
		
		
if (jq('#form-t-copy #costgt-copy').val() == 0)
return false;


//a = jq('#form-m #amountd').val();
b = jq('#form-t-copy #costgt-copy').val();

if (isNaN(b))
return false;

if (jq('#form-t-copy #kurs-EUR-copy').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-USD-copy').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-t-copy #kurs-PLN-copy').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-t-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};
	
	c2 = jq('#kurs').val();

	cb = c * b;
	cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	cbo2 = cbo * 0.1;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
	
	jq('#form-t-copy #a-1-copy').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-t-copy #a-2-copy').html('10%');
	jq('#form-t-copy #a-3-copy').html(cbo2+'<span class="br"><br /></span> грн.');
	
	a2 = 0;
	
	aa2o = a2 * c2;
aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	jq('#form-t-copy #b-1-copy').html('0%');
	jq('#form-t-copy #b-2-copy').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-t-copy #b-3-copy').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-t-copy #c-1-copy').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-t-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-t-copy #c-3-copy').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-t-copy #d-1-copy').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-t-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-t-copy table tr td.th1, #content #form-t-copy table tr td.th2').width(jq('#content #form-t-copy .result').width());
	}
	};
	
	
};


};
/**/


function calculate5(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

// Если физ.лицо
if (jq('#form-l #dv-1al').attr('checked')){
	
	//
	if (jq('#amountl').val() == 0 || jq('#costl').val() == 0)
	return false;

//Если бензиновый
if (jq('#dv-1cl').attr('checked')){

	a = jq('#amountl').val();
	b = jq('#costl').val();
	
	if (isNaN(a)||isNaN(b))
	return false;
	
	if (jq('#kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();
	
	//c = jq('#kurs').val();

	cb = c * b;
	cbo = (c * b).toFixed(2);
	cbo2 = (cbo * 0.1).toFixed(2);
	
	jq('#form-l #a-1').html(cbo+' грн.');
	jq('#form-l #a-2').html('10%');
	jq('#form-l #a-3').html(cbo2+' грн.');
	
	if (a <= 1000){
		a2 = 0.102;
	};
	if (a > 1000 && a <= 1500){
		a2 = 0.063;
	};
	if (a > 1500 && a <= 2200){
		a2 = 0.267;
	};
	if (a > 2200 && a <= 3000){
		a2 = 0.276;
	};
	if (a > 3000){
		a2 = 2.209;
	};
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#form-l #b-1').html(a + ' см3');
	jq('#form-l #b-2').html(a2 + ' EUR');
	jq('#form-l #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#form-l #c-1').html(cbocbo2 + ' грн.')
	jq('#form-l #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#form-l #c-3').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#form-l #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#form-l #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	};
	
//Если дизельный
if (jq('#dv-2cl').attr('checked')){

	a = jq('#amountl').val();
	b = jq('#costl').val();
	
	if (isNaN(a)||isNaN(b))
	return false;
	
	if (jq('#kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	if (jq('#kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	};
	
	c2 = jq('#kurs').val();
	
	//c = jq('#kurs').val();

	cb = c * b;
	cbo = (c * b).toFixed(2);
	cbo2 = (cbo * 0.1).toFixed(2);
	
	jq('#form-l #a-1').html(cbo+' грн.');
	jq('#form-l #a-2').html('10%');
	jq('#form-l #a-3').html(cbo2+' грн.');
	
	if (a <= 1500){
		a2 = 0.103;
	};
	if (a > 1500 && a <= 2500){
		a2 = 0.327;
	};
	if (a > 2500){
		a2 = 2.209;
	};
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#form-l #b-1').html(a + ' см3');
	jq('#form-l #b-2').html(a2 + ' EUR');
	jq('#form-l #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#form-l #c-1').html(cbocbo2 + ' грн.')
	jq('#form-l #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#form-l #c-3').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#form-l #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#form-l #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	};
	//
	
};
//


	
//Если юр.лицо
if (jq('#form-l #dv-2al').attr('checked')){

if (jq('#amountl').val() == 0 || jq('#costl').val() == 0)
return false;

a = jq('#amountl').val();
b = jq('#costl').val();
	
if (isNaN(a)||isNaN(b))
return false;
	
if (jq('#kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-l #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
c2 = jq('#kurs').val();

cb = c * b;
cbo = (c * b).toFixed(2);


	
	//Если новый
	if (jq('#form-l #dv-1l').attr('checked')){
		
		//Есть сертификат
		if (jq('#form-l #dv-2bl').attr('checked')){
			
			//Бензиновый
			if (jq('#form-l #dv-1cl').attr('checked')){
				//alert(1);
				
				if (a <= 1000){
					a2 = 0.102;
					cbo2 = (cbo * 0.063).toFixed(2);
					jq('#form-l #a-2').html('6.3%');
				};
				if (a > 1000 && a <= 1500){
					a2 = 0.063;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 1500 && a <= 2200){
					a2 = 0.267;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 2200 && a <= 3000){
					a2 = 0.276;
					cbo2 = (cbo * 0.063).toFixed(2);
					jq('#form-l #a-2').html('6.3%');
				};
				if (a > 3000){
					a2 = 2.209;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-l #a-2').html('5%');
				};
				
			};
			
			//Дизельный
			if (jq('#form-l #dv-2cl').attr('checked')){
				//alert(2);
	
				if (a <= 1500){
					a2 = 0.103;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 1500 && a <= 2500){
					a2 = 0.327;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 2500){
					a2 = 2.209;
					cbo2 = (cbo * 0.063).toFixed(2);
					jq('#form-l #a-2').html('6.3%');
				};
				
			};
			
		};
		
		//Нет сертификата
		if (jq('#form-l #dv-1bl').attr('checked')){
			
			//Бензиновый
			if (jq('#form-l #dv-1cl').attr('checked')){
				//alert(3);
				
				if (a <= 1000){
					a2 = 0.102;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1000 && a <= 1500){
					a2 = 0.063;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1500 && a <= 2200){
					a2 = 0.267;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 2200 && a <= 3000){
					a2 = 0.276;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 3000){
					a2 = 2.209;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-l #a-2').html('5%');
				};
				
			};
			
			//Дизельный
			if (jq('#form-l #dv-2cl').attr('checked')){
				//alert(4);
	
				if (a <= 1500){
					a2 = 0.103;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1500 && a <= 2500){
					a2 = 0.327;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 2500){
					a2 = 2.209;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				
			};
			
		};
	};
	
	//Если б/у
	if (jq('#form-l #dv-2l').attr('checked')){
		
		//Есть сертификат
		if (jq('#form-l #dv-2bl').attr('checked')){
			
			//Бензиновый
			if (jq('#form-l #dv-1cl').attr('checked')){
				//alert(5);
				
				if (a <= 1000){
					a2 = 0.102;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 1000 && a <= 1500){
					a2 = 0.063;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 1500 && a <= 2200){
					a2 = 0.267;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 2200 && a <= 3000){
					a2 = 0.276;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 3000){
					a2 = 2.209;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				
			};
			
			//Дизельный
			if (jq('#form-l #dv-2cl').attr('checked')){
				//alert(6);
	
				if (a <= 1500){
					a2 = 0.103;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 1500 && a <= 2500){
					a2 = 0.327;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				if (a > 2500){
					a2 = 2.209;
					cbo2 = (cbo * 0.073).toFixed(2);
					jq('#form-l #a-2').html('7.3%');
				};
				
			};
			
		};
		
		//Нет сертификата
		if (jq('#form-l #dv-1bl').attr('checked')){
			
			//Бензиновый
			if (jq('#form-l #dv-1cl').attr('checked')){
				//alert(7);
				
				if (a <= 1000){
					a2 = 0.102;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1000 && a <= 1500){
					a2 = 0.063;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1500 && a <= 2200){
					a2 = 0.267;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 2200 && a <= 3000){
					a2 = 0.276;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 3000){
					a2 = 2.209;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				
			};
			
			//Дизельный
			if (jq('#form-l #dv-2cl').attr('checked')){
				//alert(8);
	
				if (a <= 1500){
					a2 = 0.103;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 1500 && a <= 2500){
					a2 = 0.327;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				if (a > 2500){
					a2 = 2.209;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-l #a-2').html('10%');
				};
				
			};
			
		};
	};
	

				
	jq('#form-l #a-1').html(cbo+' грн.');
	jq('#form-l #a-3').html(cbo2+' грн.');
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#form-l #b-1').html(a + ' см3');
	jq('#form-l #b-2').html(a2 + ' EUR');
	jq('#form-l #b-3').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#form-l #c-1').html(cbocbo2 + ' грн.')
	jq('#form-l #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#form-l #c-3').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#form-l #d-1').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#form-l #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	
	
};
//

};

//
function calculate6(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

// Если физ.лицо
if (jq('#form-g2 #dv-1ag2').attr('checked')){
	//alert(1);
if (jq('#form-g2 #amountg2').val() == '' || jq('#costg2').val() == ''){
	if (jq('#form-g2 #amountg2').hasClass('no-active')){
		jq('#form-g2 #amountg2').val('').removeClass('no-active').addClass('red');
	}
	if(jq('#form-g2 #amountg2').val() == ''){
		jq('#form-g2 #amountg2').removeClass('no-active').addClass('red');
	}
	if(jq('#costg2').val() == ''){
		jq('#costg2').addClass('red');
	}
	return false;
}

if (jq('#form-g2 #amountg2').hasClass('no-active')){
	jq('#form-g2 #amountg2').val('').removeClass('no-active').addClass('red');
	return false;
}

a = jq('#form-g2 #amountg2').val();
b = jq('#form-g2 #costg2').val();
	
if (isNaN(a)||isNaN(b))
return false;

if (jq('#form-g2 #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2 #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2 #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
c2 = jq('#kurs').val();

cb = c * b;
cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	// Если бензин
	if (jq('#form-g2 #dv-1cg2').attr('checked')){
		//Если новый
		if (jq('#form-g2 #dv-1g2').attr('checked')){
			//Если до 5 тонн
			if (jq('#form-g2 #5t').attr('selected')){
				//alert(1);
				a2 = 0.01;
				cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
				jq('#form-g2 #a-2').html('10%');
			};	
			//
			//Если больше 5 тонн
			if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
				//alert(2);
				a2 = 0.013;
				cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
				jq('#form-g2 #a-2').html('10%');
			};	
			//
		};
		//
		//Если б/у
		if (jq('#form-g2 #dv-2g2').attr('checked')){
			//Если до 5 лет
			if (jq('#form-g2 #5e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(3);
					a2 = 0.02;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
					//alert(4);
					a2 = 0.026;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
			//Если 5-8 лет
			if (jq('#form-g2 #58e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(5);
					a2 = 0.8;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #form-g2 #a-2').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
					//alert(6);
					a2 = 1.04;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};
				//
			};
			//
			//Если более 8 лет
			if (jq('#form-g2 #8e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(7);
					a2 = 1;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
					//alert(8);
					a2 = 1.3;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};
				//
			};
			//
		};
		//
	};
	//
	// Если дизель
	if (jq('#form-g2 #dv-2cg2').attr('checked')){
		//Если новый
		if (jq('#form-g2 #dv-1g2').attr('checked')){
			//Если до 5 тонн
			if (jq('#form-g2 #5t').attr('selected')){
				//alert(1);
				a2 = 0.01;
				cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
				jq('#form-g2 #a-2').html('10%');
			};	
			//
			//Если  5-20 тонн
			if (jq('#form-g2 #520t').attr('selected')){
				//alert(2);
				a2 = 0.013;
				cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
				jq('#form-g2 #a-2').html('10%');
			};	
			//
			//Если более 20 тонн
			if (jq('#form-g2 #20t').attr('selected')){
				//alert(3);
				a2 = 0.016;
				cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
				jq('#form-g2 #a-2').html('10%');
			};	
			//
		};
		//
		//Если б/у
		if (jq('#form-g2 #dv-2g2').attr('checked')){
			//Если до 5 лет
			if (jq('#form-g2 #5e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(4);
					a2 = 0.02;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2 #520t').attr('selected')){
					//alert(5);
					a2 = 0.026;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2 #20t').attr('selected')){
					//alert(6);
					a2 = 0.033;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
			//Если 5-8 лет
			if (jq('#form-g2 #58e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(7);
					a2 = 0.8;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2 #520t').attr('selected')){
					//alert(8);
					a2 = 1.04;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2 #20t').attr('selected')){
					//alert(9);
					a2 = 1.32;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
			//Если более 8 лет
			if (jq('#form-g2 #8e').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(10);
					a2 = 1;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2 #520t').attr('selected')){
					//alert(11);
					a2 = 1.3;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2 #20t').attr('selected')){
					//alert(12);
					a2 = 1.65;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
		};
		//
	};
	//
	

	//		
	jq('#form-g2 #a-1').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-g2 #a-3').html(cbo2+'<span class="br"><br /></span> грн.');
	
	
	aa2o = a * a2 * c2;
	aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
	
	
	jq('#form-g2 #b-1').html(a + '<span class="br"><br /></span> см3');
	jq('#form-g2 #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-g2 #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
	cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
	
	jq('#form-g2 #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-g2 #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-g2 #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
	sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-g2 #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	jq('#form-g2 #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-g2 #link').show();
	jq('#form-g2 .proposition').show();
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-g2 table tr td.th1, #content #form-g2 table tr td.th2').width(jq('#content #form-g2 .result').width());
	}
	//
	
};
// Если юр.лицо
if (jq('#form-g2 #dv-2ag2').attr('checked')){
	//alert(2);
if (jq('#form-g2 #amountg2').val() == 0 || jq('#form-g2 #costg2').val() == 0)
return false;

a = jq('#form-g2 #amountg2').val();
b = jq('#form-g2 #costg2').val();
	//alert(a+' - '+b)
if (isNaN(a)||isNaN(b))
return false;
	
if (jq('#form-g2 #kurs-EUR').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2 #kurs-USD').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2 #kurs-PLN').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-g2 #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
c2 = jq('#kurs').val();

cb = c * b;
cbo = c * b;
cbo = Math.round(parseFloat(cbo) * 100) / 100;
	// Нет сертификата
	if (jq('#form-g2 #dv-1bg2').attr('checked')){
		// Если бензин
		if (jq('#form-g2 #dv-1cg2').attr('checked')){
			
			//Если новый
			if (jq('#form-g2 #dv-1g2').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = cbo * 0.05;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('5%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2 #dv-2g2').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2 #5e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(3);
						a2 = 0.02;
						cbo2 = cbo * 0.05;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(4);
						a2 = 0.026;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2 #58e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(5);
						a2 = 0.8;
						cbo2 = cbo * 0.05;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(6);
						a2 = 1.04;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2 #8e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(7);
						a2 = 1;
						cbo2 = cbo * 0.05;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(8);
						a2 = 1.3;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};
					//
				};
				//
			};
			//
			
		};
		//
		// Если дизель
		if (jq('#form-g2 #dv-2cg2').attr('checked')){
			//Если новый
			if (jq('#form-g2 #dv-1g2').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2 #520t').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2 #20t').attr('selected')){
					//alert(3);
					a2 = 0.016;
					cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					jq('#form-g2 #a-2').html('10%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2 #dv-2g2').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2 #5e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(4);
						a2 = 0.02;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(5);
						a2 = 0.026;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(6);
						a2 = 0.033;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2 #58e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(7);
						a2 = 0.8;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(8);
						a2 = 1.04;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(9);
						a2 = 1.32;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2 #8e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(10);
						a2 = 1;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(11);
						a2 = 1.3;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(12);
						a2 = 1.65;
						cbo2 = (cbo * 0.1);
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('10%');
					};	
					//
				};
				//
			};
			//
		};
		//
	};
	//
	// Есть сертификат
	if (jq('#form-g2 #dv-2bg2').attr('checked')){
		// Если бензин
		if (jq('#form-g2 #dv-1cg2').attr('checked')){
			
			//Если новый
			if (jq('#form-g2 #dv-1g2').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(1);
					a2 = 0.01;
					//cbo2 = cbo * 0.006;
					cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					//jq('#form-g2 #a-2').html('0.6%');
					jq('#form-g2 #a-2').html('0%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
					//alert(2);
					a2 = 0.013;
					//cbo2 = cbo * 0.013;
					cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					//jq('#form-g2 #a-2').html('1.3%');
					jq('#form-g2 #a-2').html('0%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2 #dv-2g2').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2 #5e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(3);
						a2 = 0.02;
						//cbo2 = cbo * 0.006;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('0.6%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(4);
						a2 = 0.026;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2 #58e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(5);
						a2 = 0.8;
						//cbo2 = cbo * 0.006;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('0.6%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(6);
						a2 = 1.04;
						cbo2 = cbo * 0.013;
						//cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2 #8e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(7);
						a2 = 1;
						//cbo2 = cbo * 0.006;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('0.6%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2 #520t').attr('selected') || jq('#form-g2 #20t').attr('selected')){
						//alert(8);
						a2 = 1.3;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0.013;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};
					//
				};
				//
			};
			//
			
		};
		//
		// Если дизель
		if (jq('#form-g2 #dv-2cg2').attr('checked')){
			//Если новый
			if (jq('#form-g2 #dv-1g2').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2 #5t').attr('selected')){
					//alert(1);
					a2 = 0.01;
					//cbo2 = cbo * 0.013;
					cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					//jq('#form-g2 #a-2').html('1.3%');
					jq('#form-g2 #a-2').html('0%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2 #520t').attr('selected')){
					//alert(2);
					a2 = 0.013;
					//cbo2 = cbo * 0.013;
					cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					//jq('#form-g2 #a-2').html('1.3%');
					jq('#form-g2 #a-2').html('0%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2 #20t').attr('selected')){
					//alert(3);
					a2 = 0.016;
					//cbo2 = cbo * 0.013;
					cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
					//jq('#form-g2 #a-2').html('1.3%');
					jq('#form-g2 #a-2').html('0%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2 #dv-2g2').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2 #5e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(4);
						a2 = 0.02;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(5);
						a2 = 0.026;
						cbo2 = cbo * 0; //  б/у, юр лицо, дизель, Евро1 - да, до 5 лет, 5-20 тонн - Пошлина должна быть 0, сейчас стоит 1.3%
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(6);
						a2 = 0.033;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2 #58e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(7);
						a2 = 0.8;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(8);
						a2 = 1.04;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(9);
						a2 = 1.32;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2 #8e').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2 #5t').attr('selected')){
						//alert(10);
						a2 = 1;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2 #520t').attr('selected')){
						//alert(11);
						a2 = 1.3;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2 #20t').attr('selected')){
						//alert(12);
						a2 = 1.65;
						//cbo2 = cbo * 0.013;
						cbo2 = cbo * 0;
cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
						//jq('#form-g2 #a-2').html('1.3%');
						jq('#form-g2 #a-2').html('0%');
					};	
					//
				};
				//
			};
			//
		};
		//
		
	};
	//
	

	//		
	jq('#form-g2 #a-1').html(cbo+'<span class="br"><br /></span> грн.');
	jq('#form-g2 #a-3').html(cbo2+'<span class="br"><br /></span> грн.');
	
	
	aa2o = (a * a2 * c2);
	aa2o = Math.round(parseFloat(aa2o) * 100) / 100;;
	
	
	jq('#form-g2 #b-1').html(a + '<span class="br"><br /></span> см3');
	jq('#form-g2 #b-2').html(a2 + '<span class="br"><br /></span> EUR');
	jq('#form-g2 #b-3').html(aa2o + '<span class="br"><br /></span> грн.');
	
	cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
	cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;;
	
	jq('#form-g2 #c-1').html(cbocbo2 + '<span class="br"><br /></span> грн.')
	jq('#form-g2 #c-2').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;
	
	jq('#form-g2 #c-3').html(cbocbo22 + '<span class="br"><br /></span> грн.')
	
	sum = parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22);
	sum = Math.round(parseFloat(sum) * 100) / 100;
	jq('#form-g2 #d-1').html(sum + '&nbsp;грн.');
	
	sum2 = sum / c;
	sum2 = Math.round(parseFloat(sum2) * 100) / 100;
	
	jq('#form-g2 #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	jq('#form-g2 #link').show();
	jq('#form-g2 .proposition').show();
	//
	
	if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
		jq('#content #form-g2 table tr td.th1, #content #form-g2 table tr td.th2').width(jq('#content #form-g2 .result').width());
	}
};

};
//

//

//
function calculate6copy(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

// Если физ.лицо
if (jq('#form-g2-copy #dv-1ag2-copy').attr('checked')){
	//alert(1);
if (jq('#form-g2-copy #amountg2-copy').val() == 0 || jq('#form-g2-copy #costg2-copy').val() == 0)
return false;

a = jq('#form-g2-copy #amountg2-copy').val();
b = jq('#form-g2-copy #costg2-copy').val();
	
if (isNaN(a)||isNaN(b))
return false;

if (jq('#form-g2-copy #kurs-EUR-copy').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2-copy #kurs-USD-copy').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2-copy #kurs-PLN-copy').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
c2 = jq('#kurs').val();

cb = c * b;
cbo = (c * b).toFixed(2);
	// Если бензин
	if (jq('#form-g2-copy #dv-1cg2-copy').attr('checked')){
		//Если новый
		if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
			//Если до 5 тонн
			if (jq('#form-g2-copy #5t-copy').attr('selected')){
				//alert(1);
				a2 = 0.01;
				cbo2 = (cbo * 0.1).toFixed(2);
				jq('#form-g2-copy #a-2-copy').html('10%');
			};	
			//
			//Если больше 5 тонн
			if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
				//alert(2);
				a2 = 0.013;
				cbo2 = (cbo * 0.1).toFixed(2);
				jq('#form-g2-copy #a-2-copy').html('10%');
			};	
			//
		};
		//
		//Если б/у
		if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
			//Если до 5 лет
			if (jq('#form-g2-copy #5e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(3);
					a2 = 0.02;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(4);
					a2 = 0.026;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
			//Если 5-8 лет
			if (jq('#form-g2-copy #58e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(5);
					a2 = 0.8;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(6);
					a2 = 1.04;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};
				//
			};
			//
			//Если более 8 лет
			if (jq('#form-g2-copy #8e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(7);
					a2 = 1;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(8);
					a2 = 1.3;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};
				//
			};
			//
		};
		//
	};
	//
	// Если дизель
	if (jq('#form-g2-copy #dv-2cg2-copy').attr('checked')){
		//Если новый
		if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
			//Если до 5 тонн
			if (jq('#form-g2-copy #5t-copy').attr('selected')){
				//alert(1);
				a2 = 0.01;
				cbo2 = (cbo * 0.1).toFixed(2);
				jq('#form-g2-copy #a-2-copy').html('10%');
			};	
			//
			//Если  5-20 тонн
			if (jq('#form-g2-copy #520t-copy').attr('selected')){
				//alert(2);
				a2 = 0.013;
				cbo2 = (cbo * 0.1).toFixed(2);
				jq('#form-g2-copy #a-2-copy').html('10%');
			};	
			//
			//Если более 20 тонн
			if (jq('#form-g2-copy #20t-copy').attr('selected')){
				//alert(3);
				a2 = 0.016;
				cbo2 = (cbo * 0.1).toFixed(2);
				jq('#form-g2-copy #a-2-copy').html('10%');
			};	
			//
		};
		//
		//Если б/у
		if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
			//Если до 5 лет
			if (jq('#form-g2-copy #5e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(4);
					a2 = 0.02;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected')){
					//alert(5);
					a2 = 0.026;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(6);
					a2 = 0.033;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
			//Если 5-8 лет
			if (jq('#form-g2-copy #58e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(7);
					a2 = 0.8;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected')){
					//alert(8);
					a2 = 1.04;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(9);
					a2 = 1.32;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
			//Если более 8 лет
			if (jq('#form-g2-copy #8e-copy').attr('selected')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(10);
					a2 = 1;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected')){
					//alert(11);
					a2 = 1.3;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(12);
					a2 = 1.65;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
		};
		//
	};
	//
	

	//		
	jq('#form-g2-copy #a-1-copy').html(cbo+' грн.');
	jq('#form-g2-copy #a-3-copy').html(cbo2+' грн.');
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#form-g2-copy #b-1-copy').html(a + ' см3');
	jq('#form-g2-copy #b-2-copy').html(a2 + ' EUR');
	jq('#form-g2-copy #b-3-copy').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#form-g2-copy #c-1-copy').html(cbocbo2 + ' грн.')
	jq('#form-g2-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#form-g2-copy #c-3-copy').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#form-g2-copy #d-1-copy').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#form-g2-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	//
	
};
// Если юр.лицо
if (jq('#form-g2-copy #dv-2ag2-copy').attr('checked')){
	//alert(2);
if (jq('#form-g2-copy #amountg2-copy').val() == 0 || jq('#form-g2-copy #costg2-copy').val() == 0)
return false;

a = jq('#form-g2-copy #amountg2-copy').val();
b = jq('#form-g2-copy #costg2-copy').val();
	//alert(a+' - '+b)
if (isNaN(a)||isNaN(b))
return false;
	
if (jq('#form-g2-copy #kurs-EUR-copy').attr('selected')){
		c = jq('#kurs').val();
		cur = 'EUR';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2-copy #kurs-USD-copy').attr('selected')){
		c = jq('#kurs2').val();
		cur = 'USD';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
if (jq('#form-g2-copy #kurs-PLN-copy').attr('selected')){
		c = jq('#kurs3').val();
		cur = 'PLN';
		jq('#form-g2-copy #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};	
c2 = jq('#kurs').val();

cb = c * b;
cbo = (c * b).toFixed(2);
	// Нет сертификата
	if (jq('#form-g2-copy #dv-1bg2-copy').attr('checked')){
		// Если бензин
		if (jq('#form-g2-copy #dv-1cg2-copy').attr('checked')){
			
			//Если новый
			if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('5%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2-copy #5e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(3);
						a2 = 0.02;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(4);
						a2 = 0.026;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2-copy #58e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(5);
						a2 = 0.8;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(6);
						a2 = 1.04;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2-copy #8e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(7);
						a2 = 1;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(8);
						a2 = 1.3;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};
					//
				};
				//
			};
			//
			
		};
		//
		// Если дизель
		if (jq('#form-g2-copy #dv-2cg2-copy').attr('checked')){
			//Если новый
			if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(3);
					a2 = 0.016;
					cbo2 = (cbo * 0.1).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('10%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2-copy #5e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(4);
						a2 = 0.02;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(5);
						a2 = 0.026;

						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(6);
						a2 = 0.033;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2-copy #58e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(7);
						a2 = 0.8;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(8);
						a2 = 1.04;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(9);
						a2 = 1.32;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2-copy #8e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(10);
						a2 = 1;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(11);
						a2 = 1.3;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(12);
						a2 = 1.65;
						cbo2 = (cbo * 0.1).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('10%');
					};	
					//
				};
				//
			};
			//
		};
		//
	};
	//
	// Есть сертификат
	if (jq('#form-g2-copy #dv-2bg2-copy').attr('checked')){
		// Если бензин
		if (jq('#form-g2-copy #dv-1cg2-copy').attr('checked')){
			
			//Если новый
			if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = (cbo * 0.025).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('2,5%');
				};	
				//
				//Если больше 5 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('5%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2-copy #5e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(3);
						a2 = 0.02;
						cbo2 = (cbo * 0.025).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('2,5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(4);
						a2 = 0.026;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2-copy #58e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(5);
						a2 = 0.8;
						cbo2 = (cbo * 0.025).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('2,5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(6);
						a2 = 1.04;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2-copy #8e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(7);
						a2 = 1;
						cbo2 = (cbo * 0.025).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('2,5%');
					};	
					//
					//Если больше 5 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected') || jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(8);
						a2 = 1.3;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};
					//
				};
				//
			};
			//
			
		};
		//
		// Если дизель
		if (jq('#form-g2-copy #dv-2cg2-copy').attr('checked')){
			//Если новый
			if (jq('#form-g2-copy #dv-1g2-copy').attr('checked')){
				//Если до 5 тонн
				if (jq('#form-g2-copy #5t-copy').attr('selected')){
					//alert(1);
					a2 = 0.01;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('5%');
				};	
				//
				//Если  5-20 тонн
				if (jq('#form-g2-copy #520t-copy').attr('selected')){
					//alert(2);
					a2 = 0.013;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('5%');
				};	
				//
				//Если более 20 тонн
				if (jq('#form-g2-copy #20t-copy').attr('selected')){
					//alert(3);
					a2 = 0.016;
					cbo2 = (cbo * 0.05).toFixed(2);
					jq('#form-g2-copy #a-2-copy').html('5%');
				};	
				//
			};
			//
			//Если б/у
			if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
				//Если до 5 лет
				if (jq('#form-g2-copy #5e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(4);
						a2 = 0.02;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(5);
						a2 = 0.026;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(6);
						a2 = 0.033;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
				};
				//
				//Если 5-8 лет
				if (jq('#form-g2-copy #58e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(7);
						a2 = 0.8;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(8);
						a2 = 1.04;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(9);
						a2 = 1.32;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
				};
				//
				//Если более 8 лет
				if (jq('#form-g2-copy #8e-copy').attr('selected')){
					//Если до 5 тонн
					if (jq('#form-g2-copy #5t-copy').attr('selected')){
						//alert(10);
						a2 = 1;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если  5-20 тонн
					if (jq('#form-g2-copy #520t-copy').attr('selected')){
						//alert(11);
						a2 = 1.3;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
					//Если более 20 тонн
					if (jq('#form-g2-copy #20t-copy').attr('selected')){
						//alert(12);
						a2 = 1.65;
						cbo2 = (cbo * 0.05).toFixed(2);
						jq('#form-g2-copy #a-2-copy').html('5%');
					};	
					//
				};
				//
			};
			//
		};
		//
		
	};
	//
	

	//		
	jq('#form-g2-copy #a-1-copy').html(cbo+' грн.');
	jq('#form-g2-copy #a-3-copy').html(cbo2+' грн.');
	
	
	aa2o = (a * a2 * c2).toFixed(2);
	
	
	jq('#form-g2-copy #b-1-copy').html(a + ' см3');
	jq('#form-g2-copy #b-2-copy').html(a2 + ' EUR');
	jq('#form-g2-copy #b-3-copy').html(aa2o + ' грн.');
	
	cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
	
	jq('#form-g2-copy #c-1-copy').html(cbocbo2 + ' грн.')
	jq('#form-g2-copy #c-2-copy').html('20%');
	
	cbocbo22 = cbocbo2 * 0.2;
	
	jq('#form-g2-copy #c-3-copy').html((cbocbo22).toFixed(2) + ' грн.')
	
	sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
	jq('#form-g2-copy #d-1-copy').html(sum + ' грн.');
	
	sum2 = sum / c;
	jq('#form-g2-copy #d-2-copy').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2.toFixed(2) + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
	//
};

};
//
//

// не работает на мобильных - работает с таймером, но на айфоне ещё не работает
function doOnOrientationChange() {
    switch(window.orientation) {  
      case -90 || 90:
        //alert('landscape');
		//if(jq('#content #tabs li a').css('padding') == '38px 3px 5px' && jq('#form-n #d-1').text() != ''){
		//	setTimeout("jq('#content #form-n table tr td.th1, #content #form-n table tr td.th2').width(jq('#content #form-n .result').width())", 500);
		//}
		setTimeout("jq('#content #form-n table tr td.th1').width(jq('#content #form-n .result').width()-6)", 500);
		setTimeout("jq('#content #form-g2 table tr td.th1').width(jq('#content #form-g2 .result').width()-6)", 500);
		setTimeout("jq('#content #form-e table tr td.th1').width(jq('#content #form-e .result').width()-6)", 500);
		setTimeout("jq('#content #form-t table tr td.th1').width(jq('#content #form-t .result').width()-6)", 500);
		setTimeout("jq('#content #form-t-copy table tr td.th1').width(jq('#content #form-t-copy .result').width()-6)", 500);
		setTimeout("jq('#content #form-m table tr td.th1').width(jq('#content #form-m .result').width()-6)", 500);
		setTimeout("jq('#content #form-usa table tr td.th1').width(jq('#content #form-usa .result').width()-6)", 500);
		setTimeout("jq('#content #form-zak table tr td.th1').width(jq('#content #form-zak .result').width()-6)", 500);
		
//		if(jq('.scroll-element.scroll-x.scroll-scrollx_visible').css('display') == 'block'){
//			jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','20px');
//		} else {
//			jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','10px');
//		}

        break; 
      default:
        //alert('portrait');
		//var www = 0;
		//www = jq('#content #form-n .result').width();
		//if(jq('#content #tabs li a').css('padding') == '38px 3px 5px' && jq('#form-n #d-1').text() != ''){
		//	setTimeout("jq('#content #form-n table tr td.th1, #content #form-n table tr td.th2').width(jq('#content #form-n .result').width())", 500);
		//}
		//jq('#content .yellow-cont table.border').css('border-top','2px solid #fff');
		//jq('#content .yellow-cont table.border sup').html(www+'+');
		//setTimeout("jq('#content .yellow-cont table.border sup').html(jq('#content #form-n .result').width()+'!')", 500);
		setTimeout("jq('#content #form-n table tr td.th1').width(jq('#content #form-n .result').width()-6)", 500);
		setTimeout("jq('#content #form-g2 table tr td.th1').width(jq('#content #form-g2 .result').width()-6)", 500);
		setTimeout("jq('#content #form-e table tr td.th1').width(jq('#content #form-e .result').width()-6)", 500);
		setTimeout("jq('#content #form-t table tr td.th1').width(jq('#content #form-t .result').width()-6)", 500);
		setTimeout("jq('#content #form-t-copy table tr td.th1').width(jq('#content #form-t-copy .result').width()-6)", 500);
		setTimeout("jq('#content #form-m table tr td.th1').width(jq('#content #form-m .result').width()-6)", 500);
		setTimeout("jq('#content #form-usa table tr td.th1').width(jq('#content #form-usa .result').width()-6)", 500);
		setTimeout("jq('#content #form-zak table tr td.th1').width(jq('#content #form-zak .result').width()-6)", 500);
		
//		if(jq('.scroll-element.scroll-x.scroll-scrollx_visible').css('display') == 'block'){
//			jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','20px');
//		} else {
//			jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','10px');
//		}
		
        break; 
    }
} 
window.addEventListener('orientationchange', doOnOrientationChange);
//

//
function calculate7(){
var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

a = jq('#amountn').val();
b = jq('#costn').val();
y = jq('#yearn').val();

if (jq('#amountn').val() == '' || jq('#costn').val() == '' || jq('#yearn').val() == ''  ){
	if (jq('#amountn').hasClass('no-active')){
		jq('#amountn').val('').removeClass('no-active').addClass('red');
	}
	if(jq('#amountn').val() == ''){
		jq('#amountn').removeClass('no-active').addClass('red');
	}
	if(jq('#costn').val() == ''){
		jq('#costn').addClass('red');
	}
	return false;
}
if (jq('#amountn').hasClass('no-active')){
	jq('#amountn').val('').removeClass('no-active').addClass('red');
	return false;
}

if (isNaN(a)||isNaN(b)||isNaN(y))
return false;



//Если бенз
var koef;
if (jq('#form-n #dv-1cn').attr('checked')){
	if(a <= 3000){
		koef = 50;
	} else {
		koef = 100;
	}
};
//Если дизель
if (jq('#form-n #dv-2cn').attr('checked')){
	if(a <= 3500){
		koef = 75;
	} else {
		koef = 150;
	}
};

if (jq('#form-n #kurs-EUR').attr('selected')){
	c = jq('#kurs').val();
	cur = 'EUR';
	jq('#form-n #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
	//+200EUR
	//console.log(b);
	//b = +b;
	//b = b + 200;
	//console.log(b);
	//
};

if (jq('#form-n #kurs-USD').attr('selected')){
	c = jq('#kurs2').val();
	cur = 'USD';
	jq('#form-n #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

if (jq('#form-n #kurs-PLN').attr('selected')){
	c = jq('#kurs3').val();
	cur = 'PLN';
	jq('#form-n #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');
};

c2 = jq('#kurs').val();
//console.log(c2);
//console.log(c);

//c = jq('#kurs').val();


//+200EUR
b = +b;
var ceur = jq('#kurs').val();
ceur = +ceur;
if (jq('#form-n #kurs-EUR').attr('selected')){
	b = b + 200;
	cb = c * b;
};
if (jq('#form-n #kurs-USD').attr('selected')){
	cb = c * b;
	console.log(cb);
	cb = cb + (200*ceur);
	console.log(cb);
};
if (jq('#form-n #kurs-PLN').attr('selected')){
	cb = c * b;
	console.log(cb);
	cb = cb + (200*ceur);
	console.log(cb);
};
//

//cb = c * b;
//cbo = (c * b).toFixed(2);
cbo = Math.round(parseFloat(cb) * 100) / 100;
//console.log(c);
//cbo2 = (cbo * 0.1).toFixed(2);

//
if (jq('#form-n #dv-2bn').attr('checked')){
	//cbo2 = (cbo * 0.055).toFixed(2);
	//cbo2 = Math.round(parseFloat((cbo * 0.036)) * 100) / 100;
	cbo2 = Math.round(parseFloat((cbo * 0)) * 100) / 100;
	//console.log(cbo2);
	//jq('#a-2n').html('3.6%');
	jq('#a-2n').html('0%');
} else {
	//cbo2 = (cbo * 0.1).toFixed(2);
	cbo2 = Math.round(parseFloat((cbo * 0.1)) * 100) / 100;
	//console.log(cbo2);
	jq('#a-2n').html('10%');
};
//

jq('#a-1n').html(cbo+'<span class="br"><br /></span> грн.');
//jq('#a-2n').html('10%');
jq('#a-3n').html(cbo2+'<span class="br"><br /></span> грн.');


//aa2o = (a * a2 * c2).toFixed(2);
aa2o = (koef * (a/1000) * y * c2).toFixed(2);
//console.log(koef);
//console.log(a/1000);
//console.log(y);
//console.log(c2);
//aa2o = (koef * (a/1000) * y * c2);
//aa2o = Math.round(parseFloat(aa2o) * 100) / 100;

	
//jq('#b-1n').html(a + ' см3');
//jq('#b-2n').html(a2 + ' EUR');
//jq('#b-3n').html(aa2o + ' грн.');
//jq('#b-1n').html('коеф.'+koef + '*' + a +'куб.см./1000*'+y+'лет');
jq('#b-1n').html(a +'<span class="br"><br /></span> куб.см.');
//jq('#b-2n').html(y +'х'+koef);
jq('#b-2n').html(y +'х'+koef);
jq('#b-3n').html(aa2o + '<span class="br"><br /></span> грн.');


	
//cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o));
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;
//console.log(cbocbo2);

jq('#c-1n').html(cbocbo2 + '<span class="br"><br /></span> грн.')
jq('#c-2n').html('20%');

cbocbo22 = cbocbo2 * 0.2;
cbocbo22 = Math.round(parseFloat(cbocbo22) * 100) / 100;

jq('#c-3n').html((cbocbo22) + '<span class="br"><br /></span> грн.')

//sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);
sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22));
sum = Math.round(parseFloat(sum) * 100) / 100;
jq('#form-n #d-1').html(sum + '&nbsp;грн.');

sum2 = sum / c;
sum2 = Math.round(parseFloat(sum2) * 100) / 100;
jq('#form-n #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' ' + cur +'</span> по курсу НБУ на день оформления</strong>');
jq('#form-n #link').show();
jq('#form-n .proposition').show();

//console.log(jq('#content #tabs li a').css('padding')); //38px 3px 5px
if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
	jq('#content #form-n table tr td.th1, #content #form-n table tr td.th2').width(jq('#content #form-n .result').width());
}
//.scroll-element.scroll-x.scroll-scrollx_visible, .scroll-element.scroll-y.scroll-scrolly_visible {
//    display: block;
//}
//if(jq('.scroll-element.scroll-x.scroll-scrollx_visible').css('display') == 'block'){
//	jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','20px');
//} else {
//	jq('#content .yellow-cont table.border tr.last td').css('paddingBottom','10px');
//}

};
//



//USA
function calculate888(){

//a = jq('#usa1').val();
//b = jq('#usa2').val();
//b = b.replace(' л','');
//b = b * 1000;
//c = jq('#usa3').val();
//d = jq('#usa4').val();

var a = 0;
var b = 0;
var c = 0;
var cb = 0;
var cbo = 0;
var cbo2 = 0;
var a2 = 0;
var aa2o = 0;
var cbocbo2 = 0;
var cbocbo22 = 0;
var sum = 0;
var sum2 = 0;
var c2 = 0;
var cur = 0;
var d = 0;
var d2 = 0;

a = jq('#usa2').val();
a = a.replace(' л','');
a = a * 1000;
b = jq('#usa4').val();
y = jq('#usa3').val();

if (jq('#usa4').val() == ''){
	jq('#usa4').addClass('red');
	return false;
}


//Если бенз
var koef;
if (jq('#usa1').val() == 'бензин'){
	if(a <= 3000){
		koef = 50;
	} else {
		koef = 100;
	}
};
//Если дизель
if (jq('#usa1').val() == 'дизель'){
	if(a <= 3500){
		koef = 75;
	} else {
		koef = 150;
	}
};


//
var usd1 = 0;
var usd2 = 0;
var usd3 = 0;
var usd4 = 0;
var usd1234 = 0;
var usd5 = 0;
var usd5a = 0;
var usd5b = 0;
var usd6 = 0;
var usd7 = 0;
var usd8 = 0;
var usd9 = 0;
var usd10 = 0;
var usd11 = 0;
var usd12 = 0;


usd1 = b+' USD';
jq('#form-usa #usa-1').html(usd1);


		if(b >= 0.1 && b <= 49.99)usd2 = '1.00 USD';
		if(b >= 50 && b <= 99.99)usd2 = '1.00 USD';
		if(b >= 100 && b <= 199.99)usd2 = '25.00 USD';
		if(b >= 200 && b <= 299.99)usd2 = '60.00 USD';
		if(b >= 300 && b <= 349.99)usd2 = '85.00 USD';
		if(b >= 350 && b <= 399.99)usd2 = '100.00 USD';
		if(b >= 400 && b <= 449.99)usd2 = '125.00 USD';
		if(b >= 450 && b <= 499.99)usd2 = '135.00 USD';
		if(b >= 500 && b <= 549.99)usd2 = '145.00 USD';
		if(b >= 550 && b <= 599.99)usd2 = '155.00 USD';
		if(b >= 600 && b <= 699.99)usd2 = '170.00 USD';
		if(b >= 700 && b <= 799.99)usd2 = '195.00 USD';
		if(b >= 800 && b <= 899.99)usd2 = '215.00 USD';
		if(b >= 900 && b <= 999.99)usd2 = '230.00 USD';
		if(b >= 1000 && b <= 1199.99)usd2 = '250.00 USD';
		if(b >= 1200 && b <= 1299.99)usd2 = '270.00 USD';
		if(b >= 1300 && b <= 1399.99)usd2 = '285.00 USD';
		if(b >= 1400 && b <= 1499.99)usd2 = '300.00 USD';
		if(b >= 1500 && b <= 1599.99)usd2 = '315.00 USD';
		if(b >= 1600 && b <= 1699.99)usd2 = '330.00 USD';
		if(b >= 1700 && b <= 1799.99)usd2 = '350.00 USD';
		if(b >= 1800 && b <= 1999.99)usd2 = '370.00 USD';
		if(b >= 2000 && b <= 2399.99)usd2 = '390.00 USD';
		if(b >= 2400 && b <= 2499.99)usd2 = '425.00 USD';
		if(b >= 2500 && b <= 2999.99)usd2 = '460.00 USD';
		if(b >= 3000 && b <= 3499.99)usd2 = '505.00 USD';
		if(b >= 3500 && b <= 3999.99)usd2 = '555.00 USD';
		if(b >= 4000 && b <= 4499.99)usd2 = '600.00 USD';
		if(b >= 4500 && b <= 4999.99)usd2 = '625.00 USD';
		if(b >= 5000 && b <= 5499.99)usd2 = '650.00 USD';
		if(b >= 5500 && b <= 5999.99)usd2 = '675.00 USD';
		if(b >= 6000 && b <= 6499.99)usd2 = '700.00 USD';
		if(b >= 6500 && b <= 6999.99)usd2 = '720.00 USD';
		if(b >= 7000 && b <= 7499.99)usd2 = '755.00 USD';
		if(b >= 7500 && b <= 7999.99)usd2 = '775.00 USD';
		if(b >= 8000 && b <= 8499.99)usd2 = '800.00 USD';
		if(b >= 8500 && b <= 8999.99)usd2 = '820.00 USD';
		if(b >= 9000 && b <= 9999.99)usd2 = '820.00 USD';
		if(b >= 10000 && b <= 10499.99)usd2 = '850.00 USD';
		if(b >= 10500 && b <= 10999.99)usd2 = '850.00 USD';
		if(b >= 11000 && b <= 11499.99)usd2 = '850.00 USD';
		if(b >= 11500 && b <= 11999.99)usd2 = '860.00 USD';
		if(b >= 12000 && b <= 12499.99)usd2 = '875.00 USD';
		if(b >= 12500 && b <= 14999.99)usd2 = '890.00 USD';

		if(b >= 15000)usd2 = b*0.06+' USD';


		usd3 = '130 USD';

		if(b >= 0.00 && b <= 99.99)usd4 = 'FREE';
		if(b >= 100.00 && b <= 499.99)usd4 = '50 USD';
		if(b >= 500.00 && b <= 999.99)usd4 = '65 USD';
		if(b >= 1000.00 && b <= 1499.99)usd4 = '85 USD';
		if(b >= 1500.00 && b <= 1999.99)usd4 = '95 USD';
		if(b >= 2000.00 && b <= 3999.99)usd4 = '110 USD';
		if(b >= 4000.00 && b <= 5999.99)usd4 = '125 USD';
		if(b >= 6000.00 && b <= 7999.99)usd4 = '145 USD';
		if(b >= 8000.00)usd4 = '160 USD';

//jq('#form-usa #usa-4').html(usd4);

if(usd4 == 'FREE')usd4 = '0 USD';

//console.log(parseInt(usd2));
usd1234 = parseInt(usd1) + parseInt(usd2) + parseInt(usd3) + parseInt(usd4);
	
usd234 = parseInt(usd2) + parseInt(usd3) + parseInt(usd4);
jq('#form-usa #usa-234').html(usd234+' USD');

if (jq('#form-usa #usa5-1').attr('checked')){
	usd5a = usd1234*0.015;
	usd5a = Math.ceil(usd5a * 100) / 100;
	if(usd5a < 75)usd5a = 75;
};
if (jq('#form-usa #usa5-2').attr('checked')){
	usd5b = usd1234*0.015;
	usd5b = Math.ceil(usd5b * 100) / 100;
	if(usd5b < 75)usd5b = 75;
};
usd5 = usd5a + usd5b;
//usd5 = usd5.toFixed(2);
usd5 = Math.round(parseFloat(usd5) * 100) / 100;
jq('#form-usa #usa-5').html(usd5+' USD');

usd6 = usd1234 + 1600;

//

c = jq('#kurs2').val();
cur = 'USD';
jq('#form-usa #cur').html('В расчёте использовался текущий курс НБУ - 1 '+cur+' = '+c+' грн.');


c2 = jq('#kurs').val();

cb = c * usd6;
cbo = (c * usd6);
cbo = Math.round(parseFloat(cbo) * 100) / 100;

//
if (jq('#usa1').val() != 'электро'){
	cbo2 = (cbo * 0.1);
	cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
} else {
	cbo2 = (cbo * 0);
	cbo2 = Math.round(parseFloat(cbo2) * 100) / 100;
}
//jq('#form-usa #a-2n').html('10%');
//

//jq('#form-usa #a-1n').html(cbo+' грн.');
//jq('#form-usa #a-3n').html(cbo2+' грн.');

if (jq('#usa1').val() != 'электро'){
	aa2o = (koef * (a/1000) * y * c2);
	aa2o = (koef * (a/1000) * y * c2).toFixed(2);
	aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
} else {
	kvtch = jq('#usa2a').val();
	a2 = kvtch;
	aa2o = (a2 * c2);
	aa2o = Math.round(parseFloat(aa2o) * 100) / 100;
}

		//console.log(koef);
		//console.log(a);
		//console.log(y);
		//console.log(c2);
		//console.log(aa2o);

//jq('#form-usa #b-1n').html(a +' куб.см.');
//jq('#form-usa #b-2n').html(y +'х'+koef);
//jq('#form-usa #b-3n').html(aa2o + ' грн.');

cbocbo2 = parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o);
cbocbo2 = Math.round(parseFloat(cbocbo2) * 100) / 100;;

//jq('#form-usa #c-1n').html(cbocbo2 + ' грн.')
//jq('#form-usa #c-2n').html('20%');

if (jq('#usa1').val() != 'электро'){
	cbocbo22 = cbocbo2 * 0.2;
} else {
	cbocbo22 = cbocbo2 * 0;
}

//jq('#form-usa #c-3n').html((cbocbo22).toFixed(2) + ' грн.')

sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22));
sum = Math.round(parseFloat(sum) * 100) / 100;;
//jq('#form-usa #d-1').html(sum + ' грн.');

sum2 = sum / c;
sum2 = Math.ceil(sum2 * 100) / 100;
jq('#form-usa #usa-6').html(sum2 + ' USD');

//usd7 = '250 USD';
//jq('#form-usa #usa-7').html(usd7);
usd7 = '0';
	
usd8 = '200 USD';
jq('#form-usa #usa-8').html(usd8);
usd9 = '600 USD';
jq('#form-usa #usa-9').html(usd9);
usd10 = '750 USD';
jq('#form-usa #usa-10').html(usd10);

//	
if (jq('#usa1').val() != 'электро'){
	usd12 = '1175 USD';
} else {
	usd12 = '1300 USD';
}
jq('#usa-12').html(usd12);
//

usd11 = usd1234 + parseInt(usd5) + sum2 + parseInt(usd7) + parseInt(usd8) + parseInt(usd9) + parseInt(usd10) + parseInt(usd12);
usd11 = Math.round(parseFloat(usd11) * 100) / 100;;
jq('#form-usa #usa-11').html(usd11 + '&nbsp;USD');


jq('#form-usa #d-2').html('<strong>Всего цена с доставкой: <span>' + usd11.toFixed(2) + ' ' + cur +'</span></strong>');
jq('#form-usa #link').show();
jq('#form-usa .proposition').show();

if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
	jq('#content #form-usa table tr td.th1, #content #form-usa table tr td.th2').width(jq('#content #form-usa .result').width());
}

};
//USA

//4643
function calculatezak(){
	
var a = 0;
a = jq('#amountz').val();

var y = 0;
y = jq('#yearz').val();

var c = jq('#kurs').val();


if (jq('#amountz').val() == ''){
	if (jq('#amountz').hasClass('no-active')){
		jq('#amountz').val('').removeClass('no-active').addClass('red');
	}
	if(jq('#amountz').val() == ''){
		jq('#amountz').removeClass('no-active').addClass('red');
	}
	return false;
}
if (jq('#amountz').hasClass('no-active')){
	jq('#amountz').val('').removeClass('no-active').addClass('red');
	return false;
}

if (isNaN(a))
return false;

var ycur;
ycur = y * c;
//ycur = Math.round(parseFloat(ycur) * 100) / 100;

var koef = 0;
if(a >= 1 && a <= 2000)koef = 0.25;
if(a >= 2001 && a <= 3000)koef = 0.2;
if(a >= 3001 && a <= 4000)koef = 0.25;
if(a >= 4001 && a <= 5000)koef = 0.35;
if(a >= 5001)koef = 0.5;

var fe = 0;
if (jq('#zak1').val() == 'дизель'){
	fe = 100;
};
var fecur;
fecur = fe * c;
fecur = Math.round(parseFloat(fecur) * 100) / 100;

var ycur;
ycur = y * c;
ycur = Math.round(parseFloat(ycur) * 100) / 100;

var ve;
ve = a * koef;
var vecur;
vecur = ve * c;
vecur = Math.round(parseFloat(vecur) * 100) / 100;

var a3 = 0;
a3 = ycur + vecur + fecur;
a3 = Math.round(parseFloat(a3) * 100) / 100;

var b1 = 8500;

var c1 = 0;
//c1 = (a3 * 2) + b1;
c1 = a3;
c1 = Math.round(parseFloat(c1) * 100) / 100;

var c3 = 0;
c3 = c1 * 0.2;
c3 = Math.round(parseFloat(c3) * 100) / 100;

var d1 = 0;
d1 = a3 + b1 + c3;
d1 = Math.round(parseFloat(d1) * 100) / 100;

sum2 = d1 / c;
sum2 = Math.round(parseFloat(sum2) * 100) / 100;

jq('#form-zak #a-1').html(a + '&nbsp;куб.см.');
jq('#form-zak #a-2').html(koef + '&nbsp;/&nbsp;' + fe + '&nbsp;EUR');
jq('#form-zak #a-3').html(a3 + '&nbsp;грн.');
jq('#form-zak #b-1').html(b1+'&nbsp;грн.');
jq('#form-zak #b-2').html('1');
jq('#form-zak #b-3').html(b1+'&nbsp;грн.');
jq('#form-zak #c-1').html(c1+'&nbsp;грн.');
jq('#form-zak #c-2').html('20%');
jq('#form-zak #c-3').html(c3+'&nbsp;грн.');
jq('#form-zak #d-1').html(d1+'&nbsp;грн.');

jq('#form-zak #cur').html('В расчёте использовался текущий курс НБУ - 1 EUR = '+c+' грн.');
jq('#form-zak #d-2').html('<strong>Итого, на таможню нужно заплатить <span>' + sum2 + ' EUR</span> по курсу НБУ на день оформления</strong>');
jq('#form-zak #link').show();
	
if(jq('#content #tabs li a').css('padding') == '38px 3px 5px'){
	jq('#content #form-zak table tr td.th1, #content #form-zak table tr td.th2').width(jq('#content #form-zak .result').width());
}
//console.log(jq('#content #tabs li a').css('padding'));

};
//4643


jq(document).ready(function(){
	
	//
//	jq('#usa4').bind('keyup', function(){
//		var aa = jq(this).val();
//		//console.log(aa);
//		if (!aa){
//			jq(this).val(aa.slice(0,-1));
//		}
//	})
//	jq('#usa4').change(function(){
//		var aa = jq(this).val();
//		if (/-/.test(aa)){
//			jq(this).val(aa.slice(0,-1));
//		};
//	})
//	jq('#usa2a').bind('keyup', function(){
//		var aaa = jq(this).val();
//		//console.log(aa);
//		if (!aaa){
//			jq(this).val(aaa.slice(0,-1));
//		}
//	})
//	jq('#usa2a').change(function(){
//		var aaa = jq(this).val();
//		if (/-/.test(aaa)){
//			jq(this).val(aaa.slice(0,-1));
//		};
//	})



	jq('#usa1').change(function(){
		if (jq(this).val() == 'электро'){
			jq('#form-usa .block-2b').fadeIn(300);
			jq('#form-usa .block-2a').animate({opacity: '0'}, 300);
		} else {
			jq('#form-usa .block-2b').fadeOut(300);
			jq('#form-usa .block-2a').animate({opacity: '1'}, 300);
		};
	})
	//
	
//jq('#amountn').change(function(){ //клик по стрелочкам
	//console.log(1);
//})

//только цифры
//jq('#costn, #costg2, #costg, #kvtch, #costgt, #costgt-copy, #costd, #usa4').keypress(function(e){ var a = [];
//		//console.log(e.which);
//        var k = e.which;
//        //for (i = 48; i < 58; i++)
//        for (i = 44; i < 58; i++)
//            a.push(i);
//        if (!($.inArray(k,a)>=0))
//        e.preventDefault();
//})
//
//jq('#amountn, #amountg2, #amountd').keypress(function(e){ var a = [];
//		//console.log(e.which);
//        var k = e.which;
//        for (i = 48; i < 58; i++)
//        //for (i = 44; i < 58; i++)
//            a.push(i);
//        if (!($.inArray(k,a)>=0))
//        e.preventDefault();
//})
//
//$('#amountn').on('textInput', e => {
//     var keyCode = e.originalEvent.data.charCodeAt(0);
//		jq('.block-2n label').text('-'+keyCode+'-');
//     // keyCode is ASCII of character entered.
//})

$('#amountn, #amountg2, #amountd, #amountz').on('textInput', e => {
	var a = [];
    var keyCode = e.originalEvent.data.charCodeAt(0);
	//jq('.block-2n label').text('-'+keyCode+'-');
	for (i = 48; i < 58; i++)
            a.push(i);
        if (!($.inArray(keyCode,a)>=0))
        e.preventDefault();
})
$('#costn, #costg2, #costg, #kvtch, #costgt, #costgt-copy, #costd, #usa4').on('textInput', e => {
	var a = [];
    var keyCode = e.originalEvent.data.charCodeAt(0);
	//jq('.block-2n label').text('-'+keyCode+'-');
	for (i = 44; i < 58; i++)
            a.push(i);
        if (!($.inArray(keyCode,a)>=0))
        e.preventDefault();
})

$('#amountn, #costn, #amountg2, #costg2, #costg, #kvtch, #costgt, #costgt-copy, #amountd, #costd, #usa4, #amountz').bind('keyup', function(){
		//console.log(jq(this).val());
		if (/^0/.test(jq(this).val())){
			var aaa = jq(this).val();
			$(this).val(aaa.slice(1));
		};
		if (/^\d*(\.\d{3,})/.test(jq(this).val())){
			var aaaa = jq(this).val();
			$(this).val(aaaa.slice(0,-1));
			//console.log(111);
		};
		if(jq(this).val() == ''){
			jq(this).addClass('red');
		} else {
			jq(this).removeClass('red');
		}
})
//


//enter
document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            //console.log(jq('#content #tabs li.active').index('#content #tabs li'));
			//jq('#content .tab').eq(jq('#content #tabs li.active').index('#content #tabs li')).children('form').children('.submit').click();
			var ind = jq('#content #tabs li.active').index('#content #tabs li');
			if(ind == 0){
				calculate7();
				return false;
			};
			if(ind == 1){
				calculatezak();
				return false;
			};
			if(ind == 2){
				calculate888();
				return false;
			};
			if(ind == 3){
				calculate6();
				return false;
			};
			if(ind == 4){
				calculate2();
				return false;
			};
			if(ind == 5){
				calculate4();
				return false;
			};
			if(ind == 6){
				calculate3();
				return false;
			};
        }
        return false;
    }
//

	
	
	//Клики по радиоточкам
	jq('#form-e #dv-1g, #form-e #dv-2g').change(function(){
		if (jq('#form-e #dv-2g').attr('checked')){
			jq('#form-e .block-1a').removeClass('disabled');
			//jq('#form-e .block-1a #dv-1a').removeAttr('disabled');
			jq('#form-e .block-1a #dv-1a').attr('checked','checked');
			//jq('#form-e .block-1a #dv-2a').removeAttr('disabled');
			//
			jq('#form-e .block-4').addClass('disabled');
			//jq('#form-e .block-4 #kvtch').attr('disabled','disabled');
			jq('#form-e .block-4 #kvtch').val('');
		} else {
			jq('#form-e .block-1a').addClass('disabled');
			//jq('#form-e .block-1a #dv-1a').attr('disabled','disabled');
			jq('#form-e .block-1a #dv-1a').removeAttr('checked');
			//jq('#form-e .block-1a #dv-2a').attr('disabled','disabled');
			jq('#form-e .block-1a #dv-2a').removeAttr('checked');
			jq('#form-e .block-1b').addClass('disabled');
			//jq('#form-e .block-1b #dv-1b').attr('disabled','disabled');
			jq('#form-e .block-1b #dv-1b').removeAttr('checked');
			//jq('#form-e .block-1b #dv-2b').attr('disabled','disabled');
			jq('#form-e .block-1b #dv-2b').removeAttr('checked');
			//
			jq('#form-e .block-4').removeClass('disabled');
			//jq('#form-e .block-4 #kvtch').removeAttr('disabled');
		}
	});
	
	jq('#form-e #dv-1a, #form-e #dv-2a').change(function(){
		if (jq('#form-e #dv-2a').attr('checked')){
			jq('#form-e .block-1b').removeClass('disabled');
			//jq('#form-e .block-1b #dv-1b').removeAttr('disabled');
			jq('#form-e .block-1b #dv-1b').attr('checked','checked');
			//jq('#form-e .block-1b #dv-2b').removeAttr('disabled');
		} else {
			jq('#form-e .block-1b').addClass('disabled');
			//jq('#form-e .block-1b #dv-1b').attr('disabled','disabled');
			jq('#form-e .block-1b #dv-1b').removeAttr('checked');
			//jq('#form-e .block-1b #dv-2b').attr('disabled','disabled');
			jq('#form-e .block-1b #dv-2b').removeAttr('checked');
		}
	});
	
	jq('#form-m #dv-1ad, #form-m #dv-2ad').change(function(){
	if (jq('#form-m #dv-2ad').attr('checked')){
			jq('#form-m .block-1b').removeClass('disabled');
			//jq('#form-m .block-1b #dv-1bd').removeAttr('disabled');
			jq('#form-m .block-1b #dv-1bd').attr('checked','checked');
			//jq('#form-m .block-1b #dv-2bd').removeAttr('disabled');
	} else {
			jq('#form-m .block-1b').addClass('disabled');
			//jq('#form-m .block-1b #dv-1bd').attr('disabled','disabled');
			jq('#form-m .block-1b #dv-1bd').removeAttr('checked');
			//jq('#form-m .block-1b #dv-2bd').attr('disabled','disabled');
			jq('#form-m .block-1b #dv-2bd').removeAttr('checked');
	}
	});
	
	jq('#form-t #dv-1gt, #form-t #dv-2gt, #form-t #dv-1at, #form-t #dv-2at').change(function(){
	if (jq('#form-t #dv-2gt').attr('checked') && jq('#form-t #dv-2at').attr('checked')){
			jq('#form-t .block-1b').removeClass('disabled');
			//jq('#form-t .block-1b #dv-1bt').removeAttr('disabled');
			jq('#form-t .block-1b #dv-1bt').attr('checked','checked');
			//jq('#form-t .block-1b #dv-2bt').removeAttr('disabled');
	} else {
			jq('#form-t .block-1b').addClass('disabled');
			//jq('#form-t .block-1b #dv-1bt').attr('disabled','disabled');
			jq('#form-t .block-1b #dv-1bt').removeAttr('checked');
			//jq('#form-t .block-1b #dv-2bt').attr('disabled','disabled');
			jq('#form-t .block-1b #dv-2bt').removeAttr('checked');
	}
	});
	
	jq('#form-t-copy #dv-1gt-copy, #form-t-copy #dv-2gt-copy, #form-t-copy #dv-1at-copy, #form-t-copy #dv-2at-copy').change(function(){
	if (jq('#form-t-copy #dv-2gt-copy').attr('checked') && jq('#form-t-copy #dv-2at-copy').attr('checked')){
			jq('#form-t-copy .block-1b').removeClass('disabled');
			//jq('#form-t-copy .block-1b #dv-1bt-copy').removeAttr('disabled');
			jq('#form-t-copy .block-1b #dv-1bt-copy').attr('checked','checked');
			//jq('#form-t-copy .block-1b #dv-2bt-copy').removeAttr('disabled');
	} else {
			jq('#form-t-copy .block-1b').addClass('disabled');
			//jq('#form-t-copy .block-1b #dv-1bt-copy').attr('disabled','disabled');
			jq('#form-t-copy .block-1b #dv-1bt-copy').removeAttr('checked');
			//jq('#form-t-copy .block-1b #dv-2bt-copy').attr('disabled','disabled');
			jq('#form-t-copy .block-1b #dv-2bt-copy').removeAttr('checked');
	}
	});
	
	jq('#form-l #dv-1al, #form-l #dv-2al').change(function(){
	if (jq('#form-l #dv-2al').attr('checked')){
			jq('#form-l .block-1b').removeClass('disabled');
			//jq('#form-l .block-1b #dv-1bl').removeAttr('disabled');
			jq('#form-l .block-1b #dv-1bl').attr('checked','checked');
			//jq('#form-l .block-1b #dv-2bl').removeAttr('disabled');
	} else {
			jq('#form-l .block-1b').addClass('disabled');
			//jq('#form-l .block-1b #dv-1bl').attr('disabled','disabled');
			//jq('#form-l .block-1b #dv-1bl').removeAttr('checked');
			//jq('#form-l .block-1b #dv-2bl').attr('disabled','disabled');
			jq('#form-l .block-1b #dv-2bl').removeAttr('checked');
	}
	});
	
	jq('#form-g2 #dv-1ag2, #form-g2 #dv-2ag2').change(function(){
	if (jq('#form-g2 #dv-2ag2').attr('checked')){
			jq('#form-g2 .block-1b').removeClass('disabled');
			//jq('#form-g2 .block-1b #dv-1bg2').removeAttr('disabled');
			jq('#form-g2 .block-1b #dv-1bg2').attr('checked','checked');
			//jq('#form-g2 .block-1b #dv-2bg2').removeAttr('disabled');
	} else {
			jq('#form-g2 .block-1b').addClass('disabled');
			//jq('#form-g2 .block-1b #dv-1bg2').attr('disabled','disabled');
			jq('#form-g2 .block-1b #dv-1bg2').removeAttr('checked');
			//jq('#form-g2 .block-1b #dv-2bg2').attr('disabled','disabled');
			jq('#form-g2 .block-1b #dv-2bg2').removeAttr('checked');
	}
	});
	
	jq('#form-g2 #dv-1g2, #form-g2 #dv-2g2').change(function(){
	if (jq('#form-g2 #dv-2g2').attr('checked')){
			jq('#form-g2 .block-5g2').removeClass('disabled');
			//jq('#form-g2 .block-5g2 select').removeAttr('disabled');
			jq('#form-g2 .block-5g2 select').eq(0).show();
			jq('#form-g2 .block-5g2 select.hide').hide();
		
	} else {
			jq('#form-g2 .block-5g2').addClass('disabled');
			//jq('#form-g2 .block-5g2 select').attr('disabled','disabled');
			jq('#form-g2 .block-5g2 select').eq(0).hide();
			jq('#form-g2 .block-5g2 select.hide').show();
	}
	});

	
	
	jq('#form-g2-copy #dv-1ag2-copy, #form-g2-copy #dv-2ag2-copy').change(function(){
	if (jq('#form-g2-copy #dv-2ag2-copy').attr('checked')){
			jq('#form-g2-copy .block-1b').removeClass('disabled');
			//jq('#form-g2-copy .block-1b #dv-1bg2-copy').removeAttr('disabled');
			jq('#form-g2-copy .block-1b #dv-1bg2-copy').attr('checked','checked');
			//jq('#form-g2-copy .block-1b #dv-2bg2-copy').removeAttr('disabled');
	} else {
			jq('#form-g2-copy .block-1b').addClass('disabled');
			//jq('#form-g2-copy .block-1b #dv-1bg2-copy').attr('disabled','disabled');
			jq('#form-g2-copy .block-1b #dv-1bg2-copy').removeAttr('checked');
			//jq('#form-g2-copy .block-1b #dv-2bg2-copy').attr('disabled','disabled');
			jq('#form-g2-copy .block-1b #dv-2bg2-copy').removeAttr('checked');
	}
	});
	
	jq('#form-g2-copy #dv-1g2-copy, #form-g2-copy #dv-2g2-copy').change(function(){
	if (jq('#form-g2-copy #dv-2g2-copy').attr('checked')){
			jq('#form-g2-copy .block-5g2').removeClass('disabled');
			//jq('#form-g2-copy .block-5g2 select').removeAttr('disabled');
			jq('#form-g2-copy .block-5g2 select').eq(0).show();
			jq('#form-g2-copy .block-5g2 select.hide').hide();
		
	} else {
			jq('#form-g2-copy .block-5g2').addClass('disabled');
			//jq('#form-g2-copy .block-5g2 select').attr('disabled','disabled');
			jq('#form-g2-copy .block-5g2 select').eq(0).hide();
			jq('#form-g2-copy .block-5g2 select.hide').show();
	}
	});

	jq('#form-n #dv-1an, #form-n #dv-2an').change(function(){
	if (jq('#form-n #dv-2an').attr('checked')){
			jq('#form-n .block-1b').removeClass('disabled');
			//jq('#form-n .block-1b #dv-1bn').removeAttr('disabled');
			jq('#form-n .block-1b #dv-1bn').attr('checked','checked');
			//jq('#form-n .block-1b #dv-2bn').removeAttr('disabled');
	} else {
			jq('#form-n .block-1b').addClass('disabled');
			//jq('#form-n .block-1b #dv-1bn').attr('disabled','disabled');
			jq('#form-n .block-1b #dv-1bn').removeAttr('checked');
			//jq('#form-n .block-1b #dv-2bn').attr('disabled','disabled');
			jq('#form-n .block-1b #dv-2bn').removeAttr('checked');
	}
	});
	
});

jq(document).ready(function(){
	
	//alert(jq('.eur-cur').text());
	var eur = jq('.eur-cur').text();
	eur = eur.replace(',', '.');
	jq('#kurs').val(eur);
	var usd = jq('.usd-cur').text();
	usd = usd.replace(',', '.');
	jq('#kurs2').val(usd);
	var pln = jq('.pln-cur').text();
	pln = pln.replace(',', '.');
	jq('#kurs3').val(pln);
	
	
	
});

//jq(window).resize(function(){
//	
//});