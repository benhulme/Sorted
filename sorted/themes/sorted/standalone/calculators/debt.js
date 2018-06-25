var SortedCalculator_Debt=SortedCalculator.extend({init:function(){"use strict";this._super()},test_mode:!1,check_vars:function(l,e){"use strict";var t;for(t=0;t<l.length;t+=1)if(null===l[t]||void 0===l[t])return!1;return!0},cc_model:function(l){"use strict";try{var e,t,n={};return l={amount_owed:isNaN(parseFloat(l.amount_owed,10))?null:parseFloat(l.amount_owed,10),interest_rate:isNaN(parseFloat(l.interest_rate,10))?null:parseFloat(l.interest_rate,10),repayment_amount:isNaN(parseFloat(l.repayment_amount,10))?null:parseFloat(l.repayment_amount,10),repayment_frequency:isNaN(parseFloat(l.repayment_frequency,10))?null:parseFloat(l.repayment_frequency,10),nudge_payment:isNaN(parseFloat(l.nudge_payment,10))?null:parseFloat(l.nudge_payment,10)},console.debug=!1,n.b8=l.amount_owed,n.d8=null===l.interest_rate?null:l.interest_rate/100,n.b12=l.repayment_amount,n.j24=l.repayment_frequency,n.l7=n.j24,n.j22=null,n.j23=null,0!==n.l7&&(null!==n.d8&&null!==n.l7&&(n.j22=n.d8/n.l7),null!==n.b8&&null!==n.l7&&(n.j23=.02*n.b8*12/n.l7)),0===n.b12?n.j24=n.j23:n.j24=n.b12,n.j25=null,null!==n.j22&&(n.j22>0?null!==n.b8&&null!==n.j24&&null!==n.j22&&null!==n.l7&&0!=n.j24&&0!=n.l7&&0!=Math.log(1+n.j22)&&1-n.b8/n.j24*n.j22>0&&1+n.j22>0&&(n.j25=-(Math.log(1-n.b8/n.j24*n.j22)/Math.log(1+n.j22))/n.l7):null!==n.b8&&null!==n.j24&&null!==n.l7&&0!=n.j24&&0!=n.l7&&(n.j25=n.b8/n.j24/n.l7)),n.c23=null,null!==n.j24&&null!==n.l7&&null!==n.j25&&(n.c23=n.j24*n.l7*n.j25),n.b26=null,null!==n.c23&&null!==n.b8&&(n.b26=n.c23-n.b8),n.c26=null,null!==n.j25&&(n.c26=this.roundUP(12*n.j25)),n.d26=null,null!==this.age&&null!==n.j25&&(e=Date.today(),e.setHours(0,0,0),t=new TimeSpan(e-this.age),n.d26=this.trunc(t.getDays()/365.25+n.j25)),n.warning=0,null!==n.j24&&null!==n.j23&&n.j24<n.j23&&(n.warning=1),n.c29=null,n.j27=null,null!==l.nudge_payment?(n.c29=l.nudge_payment,n.j27=n.c29):n.j27=this.roundUP(1.2*n.b12,-1),n.j26=null,this.check_vars([n.j22,n.b8,n.j27,n.j22,n.l7],"model.j26")&&(n.j22>0?n.j26=-(Math.log(1-n.b8/n.j27*n.j22)/Math.log(1+n.j22))/n.l7:n.j26=n.b8/n.j27/n.l7),n.b32=null,null!==n.j27&&null!==n.j26&&null!==n.l7&&(n.b32=n.j27*n.j26*n.l7),n.c32=null,null!==n.b32&&null!==n.b8&&(n.c32=n.b32-n.b8),n.d32=null,null!==n.j26&&(n.d32=this.roundUP(12*n.j26)),n.e32=null,null!==this.age&&null!==n.cj26&&null!==n.j25&&null!==this.month_born&&null!==this.year_born&&(e=Date.today(),e.setHours(0,0,0),t=new TimeSpan(e-this.age),n.e32=this.trunc(t.getDays()/365.25+n.j26)),n.d29=null,null!==n.c23&&null!==n.b32&&(n.d29=n.c23-n.b32),{result_total:n.c23,result_interest:n.b26,result_time_to_repay:n.c26,result_age_repaid:n.d26,result_warning:n.warning,result_nudge:{payment:n.c29,total:n.b32,interest:n.c32,months:n.d32,age:n.e32,savings:n.d29}}}catch(l){}},hpcl_model:function(l){"use strict";try{var e,t,n,r,a={};return console.dir(l),l={amount_borrowed:isNaN(parseFloat(l.amount_borrowed,10))?0:parseFloat(l.amount_borrowed,10),interest_rate:isNaN(parseFloat(l.interest_rate,10))?null:parseFloat(l.interest_rate,10),interest_free_period:isNaN(parseInt(l.interest_free_period,10))?0:parseInt(l.interest_free_period,10),startup_fees:isNaN(parseFloat(l.startup_fees,10))?0:parseFloat(l.startup_fees,10),other_fees:isNaN(parseFloat(l.other_fees,10))?0:parseFloat(l.other_fees,10),deferred_payment_months:isNaN(parseInt(l.deferred_payment_months,10))?0:parseInt(l.deferred_payment_months,10),repayment_frequency:isNaN(parseFloat(l.repayment_frequency,10))?null:parseFloat(l.repayment_frequency,10),total_term_months:isNaN(parseInt(l.total_term_months,10))?null:parseInt(l.total_term_months,10),nudge_payment:isNaN(parseFloat(l.nudge_payment,10))?null:parseFloat(l.nudge_payment,10),month_born:isNaN(parseInt(l.month_born,10))?null:parseInt(l.month_born,10),year_born:isNaN(parseInt(l.year_born,10))?null:parseInt(l.year_born,10)},a.b8=l.amount_borrowed,a.e8=null===l.interest_rate?null:l.interest_rate/100,a.b12=l.interest_free_period,a.d12=l.startup_fees,a.e12=l.other_fees,a.b16=l.deferred_payment_months,a.d16=l.total_term_months,a.q7=l.total_term_months,a.e16=l.repayment_frequency,a.o7=l.repayment_frequency,a.k7=12,a.m7=12,a.b22=l.month_born,a.c22=l.year_born,a.k29=null,null!==a.b12&&null!==a.k7&&0!=a.k7&&(a.k29=a.b12/a.k7),a.m30=null,null!==a.b16&&null!==a.m7&&0!=a.m7&&(a.k30=a.b16/a.m7),a.k31=null===a.q7?null:a.q7/12,a.k33=a.o7,a.k34=null===a.e8||null===a.k33?null:a.e8/a.k33,a.k36=null,null!==a.b8&&null!==a.d12&&null!==a.e12&&(a.k36=a.b8+a.d12+a.e12),a.k38=null,null!==a.k29&&null!==a.k30&&(a.k38=Math.max(0,a.k29-a.k30)),a.k37=null,null!==a.k31&&null!==a.k30&&null!==a.k38&&(a.k37=a.k31-a.k30-a.k38),a.k39=null,null!==a.k29&&null!==a.k30&&(a.k39=Math.max(0,a.k30-a.k29)),e=null,this.check_vars([a.k34,a.k39,a.k33],"hp model.c28 1")&&(e=Math.pow(1+a.k34,-(a.k39*a.k33))),t=null,this.check_vars([a.k34,a.k37,a.k33],"hp model.c28 2")&&(t=a.k34>0?(1-Math.pow(1+a.k34,-(a.k37*a.k33)))/a.k34:a.k37*a.k33),n=null,this.check_vars([e,t],"hp model.c28 3")&&(n=e*t),a.c28=null,this.check_vars([a.k36,a.k38,a.k33,n],"hp model.c28 4")&&n+a.k38*a.k33!=0&&(a.c28=a.k36/(n+a.k38*a.k33)),a.b31=null,null!==a.c28&&null!==a.k33&&null!==a.k31&&null!==a.k30&&(a.b31=a.c28*a.k33*(a.k31-a.k30)),a.c31=null,null!==a.b31&&null!==a.k36&&(a.c31=a.b31-a.k36),a.d31=null,null!==a.k31&&(a.d31=this.roundUP(12*a.k31)),a.e31=null,null!==this.age&&null!==a.k31&&(t=Date.today(),t.setHours(0,0,0),r=new TimeSpan(t-this.age).days,a.e31=this.trunc(r/365.25+a.k31)),a.warning=0,a.k29>a.k31&&(a.warning=1),a.c33=null,null!==l.nudge_payment&&(a.c33=l.nudge_payment),a.c36=null,null!==a.b36&&null!==a.k36&&(a.c36=a.b36-a.k36),a.k44=null,null!==a.k30&&null!==a.k34&&null!==a.k36&&null!==a.c33&&null!==a.k39&&null!==a.k33&&(a.k34>0?1-a.k36/a.c33*a.k34*Math.pow(1+a.k34,a.k39*a.k33)<=0?a.k44=!1:a.k44=a.k30+-Math.log(1-a.k36/a.c33*a.k34*Math.pow(1+a.k34,a.k39*a.k33))/Math.log(1+a.k34)/a.k33:a.k44=a.k30+a.k36/(a.k33*a.c33)),a.k45=null,null!==a.k29&&null!==a.k34&&null!==a.k36&&null!==a.k38&&null!==a.k33&&null!==a.c33&&(a.k34>0?(e=a.k36-a.k38*a.k33*a.c33,t=-Math.log(1-e/a.c33*a.k34),a.k45=a.k29+t/Math.log(1+a.k34)/a.k33):a.k45=a.k29+(a.k36-a.k38*a.k33*a.c33)/(a.k33*a.c33)),a.k46=null,null!==a.k36&&null!==a.k33&&null!==a.c33&&null!==a.k30&&(a.k46=a.k36/(a.k33*a.c33)+a.k30),a.k41=null,a.c33<a.c28?a.k41=null:null!==a.k29&&null!==a.k30&&null!==a.k44&&null!==a.k36&&null!==a.k33&&null!==a.k38&&null!==a.c33&&null!==a.k45&&null!==a.k46&&(a.k29<=a.k30?a.k41=a.k44:a.k36-a.k38*a.k33*a.c33>0?a.k41=a.k45:a.k36-a.k38*a.k33*a.c33<=0?a.k41=a.k46:a.k41=!1),a.b36=null,null!==a.c33&&null!==a.k33&&null!==a.k41&&null!==a.k30&&(a.b36=a.c33*a.k33*(a.k41-a.k30)),a.c36=null,null!==a.b36&&null!==a.k36&&(a.c36=a.b36-a.k36),a.d36=null,null!==a.k41&&(a.d36=this.roundUP(12*a.k41)),a.e36=null,null!==this.age&&null!==a.k41&&(t=Date.today(),t.setHours(0,0,0),r=new TimeSpan(t-this.age),a.e36=this.trunc(r.getDays()/365.25+a.k41)),a.d33=null,null!==a.b31&&null!==a.b36&&(a.d33=a.b31-a.b36),{result_min_payment:a.c28,result_total:a.b31,result_interest:a.c31,result_time_to_repay:a.d31,result_age_repaid:a.e31,result_warning:a.warning,result_nudge:{payment:a.c33,total:a.b36,interest:a.c36,months:a.d36,age:a.e36,savings:a.d33}}}catch(l){}},plol_model:function(l){"use strict";try{var e,t,n={};return l={amount_borrowed:isNaN(parseFloat(l.amount_borrowed,10))?null:parseFloat(l.amount_borrowed,10),interest_rate:isNaN(parseFloat(l.interest_rate,10))?null:parseFloat(l.interest_rate,10),total_term_months:isNaN(parseInt(l.total_term_months,10))?null:parseInt(l.total_term_months,10),repayment_frequency:isNaN(parseFloat(l.repayment_frequency,10))?null:parseFloat(l.repayment_frequency,10),month_born:isNaN(parseInt(l.month_born,10))?null:parseInt(l.month_born,10),year_born:isNaN(parseInt(l.year_born,10))?null:parseInt(l.year_born,10),nudge_payment:isNaN(parseFloat(l.nudge_payment,10))?null:parseFloat(l.nudge_payment,10)},n.b8=l.amount_borrowed,n.d8=null===l.interest_rate?null:l.interest_rate/100,n.b14=l.total_term_months,n.c14=l.repayment_frequency,n.b22=l.month_born,n.c22=l.year_born,n.i7=l.month_born,n.k7=l.repayment_frequency,n.m7=l.total_term_months,n.k29=null,null!==n.l7&&(n.k29=n.m7/12),n.k31=n.k7,n.k32=null,null!==n.d8&&null!==n.k31&&(n.k32=n.d8/n.k31),n.k34=n.b8,n.c28=null,null!==n.k32&&(n.k32>0?null!==n.k34&&null!==n.k32&&null!==n.k29&&null!==n.k31&&0!=n.k32&&(1-Math.pow(1+n.k32,-(n.k29*n.k31)))/n.k32!=0&&(n.c28=n.k34/((1-Math.pow(1+n.k32,-(n.k29*n.k31)))/n.k32)):null!==n.k34&&null!==n.k31&&null!==n.k29&&n.k31*n.k29!=0&&(n.c28=n.k34/(n.k31*n.k29))),n.b31=null,null!==n.c28&&null!==n.k31&&null!==n.k29&&(n.b31=n.c28*n.k31*n.k29),n.c31=null,null!==n.b31&&null!==n.k34&&(n.c31=n.b31-n.k34),n.d31=null,null!==n.k29&&(n.d31=this.roundUP(12*n.k29)),n.e31=null,null!==this.age&&null!==n.k29&&(e=Date.today(),e.setHours(0,0,0),t=new TimeSpan(e-this.age).days,n.e31=this.trunc(t/365.25+n.k29)),n.warning=0,n.d8<0&&(n.warning=1),n.c33=null,null!==l.nudge_payment&&(n.c33=l.nudge_payment),n.k36=null,null!==n.k32&&null!==n.k34&&null!==n.c33&&null!==n.k31&&(n.k32>0?n.k36=-(Math.log(1-n.k34/n.c33*n.k32)/Math.log(1+n.k32)/n.k31):n.k36=n.k34/(n.k31*n.c33)),n.b36=null,null!==n.c33&&null!==n.k31&&null!==n.k36&&(n.b36=n.c33*n.k31*n.k36),n.c36=null,null!==n.b36&&null!==n.k34&&(n.c36=n.b36-n.k34),n.d36=null,null!==n.k36&&(n.d36=this.roundUP(12*n.k36)),n.e36=null,null!==this.age&&null!==n.k36&&(e=Date.today(),e.setHours(0,0,0),t=new TimeSpan(e-this.age),n.e36=this.trunc(t.getDays()/365.25+n.k36)),n.d33=null,null!==n.b31&&null!==n.b36&&(n.d33=n.b31-n.b36),{result_min_payment:n.c28,result_total:n.b31,result_interest:n.c31,result_time:n.d31,result_age:n.e31,result_warning:n.warning,result_nudge:{payment:n.c33,total:n.b36,interest:n.c36,months:n.d36,age:n.e36,savings:n.d33}}}catch(l){}},calculate:function(l){"use strict";this._super(),console.debug=!1,l.year_born=isNaN(parseInt(l.year_born,10))?null:parseInt(l.year_born,10),l.month_born=isNaN(parseInt(l.month_born,10))?null:parseInt(l.month_born,10);var e,t;return this.results={},this.age=null,null!==l.month_born&&null!==l.year_born&&(this.age=Date.parse("15-"+l.month_born+"-"+l.year_born),this.age.setHours(0,0,0)),this.month_born=l.month_born,this.year_born=l.year_born,this.total=0,e=this,$.each(l,function(l,n){switch(l){case"cc":e.results.cc={},e.results.cc.total=0,t=e,$.each(n,function(l,n){n.month_born=e.month_born,n.year_born=e.year_born,t.results.cc[l]=e.cc_model(n),t.results.cc[l].result_warning&&e.add_error("repayment_impossible_"+l),delete t.results.cc[l].result_warning,e.results.cc.total+=e.round(isNaN(parseFloat(t.results.cc[l].result_total,10))?0:parseFloat(t.results.cc[l].result_total,10),2),e.total+=isNaN(parseFloat(t.results.cc[l].result_total,10))?0:parseFloat(t.results.cc[l].result_total,10)});break;case"hp":e.results.hp={},e.results.hp.total=0,t=e,$.each(n,function(l,n){n.month_born=e.month_born,n.year_born=e.year_born,t.results.hp[l]=e.hpcl_model(n),e.results.hp.total+=e.round(isNaN(parseFloat(t.results.hp[l].result_total,10))?0:parseFloat(t.results.hp[l].result_total,10),2),e.total+=isNaN(parseFloat(t.results.hp[l].result_total,10))?0:parseFloat(t.results.hp[l].result_total,10)});break;case"cl":e.results.cl={},e.results.cl.total=0,t=e,$.each(n,function(l,n){n.month_born=e.month_born,n.year_born=e.year_born,t.results.cl[l]=e.hpcl_model(n),e.results.cl.total+=e.round(isNaN(parseFloat(t.results.cl[l].result_total,10))?0:parseFloat(t.results.cl[l].result_total,10),2),e.total+=isNaN(parseFloat(t.results.cl[l].result_total,10))?0:parseFloat(t.results.cl[l].result_total,10)});break;case"pl":e.results.pl={},e.results.pl.total=0,t=e,$.each(n,function(l,n){n.month_born=e.month_born,n.year_born=e.year_born,t.results.pl[l]=e.plol_model(n),e.results.pl.total+=e.round(isNaN(parseFloat(t.results.pl[l].result_total,10))?0:parseFloat(t.results.pl[l].result_total,10),2),e.total+=isNaN(parseFloat(t.results.pl[l].result_total,10))?0:parseFloat(t.results.pl[l].result_total,10)});break;case"ol":e.results.ol={},e.results.ol.total=0,t=e,$.each(n,function(l,n){n.month_born=e.month_born,n.year_born=e.year_born,t.results.ol[l]=e.plol_model(n),e.results.ol.total+=e.round(isNaN(parseFloat(t.results.ol[l].result_total,10))?0:parseFloat(t.results.ol[l].result_total,10),2),e.total+=isNaN(parseFloat(t.results.ol[l].result_total,10))?0:parseFloat(t.results.ol[l].result_total,10)})}}),this.results.total=this.round(e.total,2),console.dir(this.results),this.results}}),testmode=!1,testObj={month_born:9,year_born:1977,cc:{cc1:{amount_owed:2e3,interest_rate:20,repayment_amount:185.27,repayment_frequency:12,nudge_payment:230},cc2:{amount_owed:3e3,interest_rate:20,repayment_amount:20,repayment_frequency:52,nudge_payment:230},cc3:{amount_owed:2e3,interest_rate:20,repayment_amount:20,repayment_frequency:12,nudge_payment:230}},hp:{hp1:{amount_borrowed:1e3,interest_rate:20.75,interest_free_period:6,startup_fees:85,other_fees:50,deferred_payment_months:3,total_term_months:12,repayment_frequency:26,nudge_payment:80},hp2:{amount_borrowed:1e3,interest_rate:20.75,interest_free_period:8,startup_fees:85,other_fees:50,deferred_payment_months:3,total_term_months:12,repayment_frequency:26,nudge_payment:80}},cl:{cl1:{amount_borrowed:1e3,interest_rate:20.75,interest_free_period:0,startup_fees:0,other_fees:0,deferred_payment_months:0,total_term_months:12,repayment_frequency:26,nudge_payment:80}},pl:{pl1:{amount_borrowed:1e3,interest_rate:.2075,total_term_months:12,repayment_frequency:26,nudge_payment:60},pl2:{amount_borrowed:2e3,interest_rate:.2075,total_term_months:12,repayment_frequency:26,nudge_payment:80}},ol:{ol1:{amount_borrowed:4563,interest_rate:.2075,total_term_months:12,repayment_frequency:26,nudge_payment:80}}};testmode===!0&&function(l){"use strict";!function(){var l=new SortedCalculator_Debt;l.calculate(testObj)}()}(jQuery);