console.debug=!1;var debug=!1,SortedCalculator_Savings=SortedCalculator.extend({init:function(){"use strict";debug&&console.log("SortedCalculator_Savings.init"),this._super()},debug_mode:!1,check_vars:function(e,l){"use strict";var n;for(n=0;n<e.length;n+=1){if(null===e[n]||void 0===e[n])return debug&&console.log(l+") found null or undefined in key ["+n+"]",e),!1;if(isNaN(e[n]))return debug&&console.log(l+") found NaN in key ["+n+"]",e),!1}return!0},calculate:function(e){"use strict";this.debug_mode&&(console.debug=!0);var l,n,t={},o={},a=new Date;return debug&&console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX "+a.toString("HH:mm:ss")),debug&&console.log("______________Incoming Input Object______________________"),debug&&console.dir(e),e={type:isNaN(parseInt(e.type,10))?0:parseInt(e.type,10),saving_amount:isNaN(parseFloat(e.saving_amount,10))?0:parseFloat(e.saving_amount,10),regular_amount:isNaN(parseFloat(e.regular_amount,10))?0:parseFloat(e.regular_amount,10),saving_freq:isNaN(parseInt(e.saving_freq,10))?null:parseInt(e.saving_freq,10),starting:Date.parse(e.starting),ending:Date.parse(e.ending),initial_savings:isNaN(parseFloat(e.initial_savings,10))?0:parseFloat(e.initial_savings,10),interest_rate:isNaN(parseFloat(e.interest_rate,10))?null:parseFloat(e.interest_rate,10),age_month:isNaN(parseInt(e.age_month,10))?null:parseInt(e.age_month,10),age_year:isNaN(parseInt(e.age_year,10))?null:parseInt(e.age_year,10),nudge_dollars:isNaN(parseFloat(e.nudge_dollars,10))?null:parseFloat(e.nudge_dollars,10),iar:isNaN(parseInt(e.iar,10))?0:parseInt(e.iar,10)},debug&&console.log("______________Cleaned Input Object______________________"),debug&&console.dir(e),t.type=null,null!==e.type&&(t.type=e.type),t.dob=null,this.check_vars([e.age_month,e.age_year],"work.dob")&&(t.dob=Date.parse("15-"+e.age_month+"-"+e.age_year)),t.span=null,this.check_vars([t.dob],"work.span")&&(t.span=new TimeSpan(Date.today()-t.dob)),t.regular=null,this.check_vars([e.regular_amount],"work.regular")&&(t.regular=e.regular_amount),t.start=null,this.check_vars([e.starting],"work.start")&&(t.start=e.starting),t.end=null,this.check_vars([e.ending],"work.end")&&(t.end=e.ending),t.saved=null,this.check_vars([e.initial_savings],"work.saved")&&(t.saved=e.initial_savings),t.goal=null,this.check_vars([e.saving_amount],"work.goal")&&(t.goal=e.saving_amount),t.interest_rate=null,this.check_vars([e.interest_rate],"work.interest_rate")&&(t.interest_rate=e.interest_rate/100),t.freq=null,this.check_vars([e.saving_freq],"work.freq")&&(t.freq=e.saving_freq),1===e.iar?t.inflation_adjusted=!0:t.inflation_adjusted=!1,t.b23=t.saved,t.b24=t.regular,t.b25=t.freq,t.b29=t.interest_rate,t.b28=constants.inflation_rate,t.b27=null,this.check_vars([t.b29,t.b28],"work.b27")&&(t.b27=(1+t.b29)/(1+t.b28)-1),t.b30=null,this.check_vars([t.b27,t.b25],"work.b30")&&(t.b30=Math.pow(1+t.b27,1/t.b25)-1),t.b34=null,this.check_vars([t.end,t.start],"work.b30")&&(t.b34=t.end.getFullYear()-t.start.getFullYear()+(t.end.getMonth()-t.start.getMonth())/12+(t.end.getDate()-t.start.getDate())/365.25),t.b35=null,this.check_vars([t.start],"work.b35")&&(t.b35=t.start.getFullYear()-Date.today().getFullYear()+(t.start.getMonth()-Date.today().getMonth())/12+(t.start.getDate()-Date.today().getDate())/365.25),t.b32=null,this.check_vars([t.b29,t.b25],"work.b32")&&(t.b32=Math.pow(1+t.b29,1/t.b25)-1),t.b31=null,this.check_vars([t.b28,t.b25],"work.b31")&&(t.b31=Math.pow(1+t.b28,1/t.b25)-1),t.b38=null,null!==t.b24&&null!==t.b29&&null!==t.b34&&null!==t.b32&&(t.b38=t.b24*(Math.pow(1+t.b29,t.b34)-1)/t.b32),t.c37=null,null!==t.b23&&null!==t.b27&&null!==t.b34&&null!==t.b35&&(t.c37=t.b23*Math.pow(1+t.b27,t.b34+t.b35)),t.b37=null,null!==t.b23&&null!==t.b29&&null!==t.b34&&null!==t.b35&&(t.b37=t.b23*Math.pow(1+t.b29,t.b34+t.b35)),t.c38=null,null!==t.b38&&null!==t.b28&&null!==t.b34&&null!==t.b35&&(t.c38=t.b38*Math.pow(1+t.b28,-(t.b34+t.b35))),t.c39=null,null!==t.c37&&null!==t.c38&&(t.c39=t.c37+t.c38),t.c41=null,null!==t.b24&&null!==t.b28&&null!==t.b34&&null!==t.b35&&null!==t.b23&&(t.c41=t.b24*(1-Math.pow(1+t.b28,-t.b34))/t.b31*Math.pow(1+t.b28,-t.b35)+t.b23),t.b41=null,null!==t.b23&&null!==t.b24&&null!==t.b25&&null!==t.b34&&(t.b41=t.b23+t.b24*t.b25*t.b34),t.b39=null,null!==t.b37&&null!==t.b38&&(t.b39=t.b37+t.b38),t.c42=null,null!==t.c39&&null!==t.c41&&(t.c42=t.c39-t.c41),t.b42=null,null!==t.b39&&null!==t.b41&&(t.b42=t.b39-t.b41),t.b51=t.b23,t.b52=0,null!==e.nudge_dollars&&(t.b52=e.nudge_dollars),t.b53=t.b25,t.b56=constants.inflation_rate,t.b57=t.b29,t.b55=0,null!==t.b57&&null!==t.b56&&(t.b55=(1+t.b57)/(1+t.b56)-1),t.b58=null,null!==t.b55&&null!==t.b53&&(t.b58=Math.pow(1+t.b55,1/t.b53)-1),t.b59=null,null!==t.b56&&null!==t.b53&&(t.b59=Math.pow(1+t.b56,1/t.b53)-1),t.b60=null,null!==t.b57&&null!==t.b53&&(t.b60=Math.pow(1+t.b57,1/t.b53)-1),t.b62=t.b34,t.b63=t.b35,t.b65=null,null!==t.b51&&null!==t.b57&&null!==t.b62&&null!==t.b63&&(t.b65=t.b51*Math.pow(1+t.b57,t.b62+t.b63)),t.b66=null,null!==t.b52&&null!==t.b57&&null!==t.b62&&null!==t.b60&&(t.b66=t.b52*(Math.pow(1+t.b57,t.b62)-1)/t.b60),t.b67=null,null!==t.b65&&null!==t.b66&&(t.b67=t.b65+t.b66),t.b69=null,null!==t.b51&&null!==t.b52&&null!==t.b53&&null!==t.b62&&(t.b69=t.b51+t.b52*t.b53*t.b62),t.b70=null,null!==t.b67&&null!==t.b69&&(t.b70=t.b67-t.b69),t.b72=null,null!==t.span&&null!==t.b34&&null!==t.b35&&(t.b72=t.span.getDays()/365.25+(t.b62+t.b63)),t.c65=null,null!==t.b51&&null!==t.b55&&null!==t.b62&&null!==t.b63&&(t.c65=t.b51*(1+Math.pow(1+t.b55,t.b62+t.b63))),t.c66=null,null!==t.b66&&null!==t.b56&&null!==t.b62&&null!==t.b63&&(t.c66=t.b66*Math.pow(1+t.b56,-(t.b62+t.b63))),t.c67=null,null!==t.c65&&null!==t.c66&&(t.c67=t.c65+t.c66),t.c69=null,null!==t.b52&&null!==t.b56&&null!==t.b62&&null!==t.b59&&null!==t.b63&&null!==t.b51&&(t.c69=t.b52*(1-Math.pow(1+t.b56,-t.b62))/t.b59*Math.pow(1+t.b59,-t.b63)+t.b51),t.c70=null,null!==t.c67&&null!==t.c69&&(t.c70=t.c67-t.c69),t.f23=t.b23,t.f25=null,null!==e.saving_freq&&(t.f25=e.saving_freq),t.f27=t.b27,t.f28=t.b28,t.f30=t.b30,t.f31=t.b31,t.f32=t.b32,t.f34=t.b34,t.f35=t.b35,t.f37=t.b37,t.g37=t.c37,t.f39=e.saving_amount,t.g39=null,null!==t.f39&&null!==t.f28&&null!==t.f34&&null!==t.f35&&(t.g39=t.f39*Math.pow(1+t.f28,-(t.f34+t.f35))),t.f38=null,this.check_vars([t.f39,t.f37],"work.f38")&&(t.f38=t.f39-t.f37),t.f29=e.interest_rate/100,t.g38=null,null!==t.g39&&null!==t.g37&&(t.g38=t.g39-t.g37),t.f24=null,this.check_vars([t.f38,t.f29,t.f32,t.f34],"work.f24")&&(t.f24=t.f38/((Math.pow(1+t.f29,t.f34)-1)/t.f32)),t.f41=null,null!==t.f23&&null!==t.f24&&null!==t.f25&&null!==t.f34&&(t.f41=t.f23+t.f24*t.f25*t.f34),t.g41=null,null!==t.f24&&null!==t.f28&&null!==t.f34&&null!==t.f31&&null!==t.f35&&null!==t.f23&&(t.g41=t.f24*(1-Math.pow(1+t.f28,-t.f34))/t.f31*Math.pow(1+t.f28,-t.f35)+t.f23),t.f42=null,null!==t.f39&&null!==t.f41&&(t.f42=t.f39-t.f41),t.g42=null,null!==t.g39&&null!==t.g41&&(t.g42=this.round_negative(t.g39-t.g41,4)),t.b44=null,null!==t.span&&null!==t.b34&&null!==t.b35&&(l=Date.parse("15-"+e.age_month+"-"+e.age_year),n=Date.today(),l.setHours(0,0,0),n.setHours(0,0,0),t.span=new TimeSpan(n-l),t.b44=t.span.getDays()/365.25+(t.b34+t.b35)),t.f44=null,null!==t.span&&null!==t.f34&&null!==t.f35&&(l=Date.parse("15-"+e.age_month+"-"+e.age_year),n=Date.today(),l.setHours(0,0,0),n.setHours(0,0,0),t.span=new TimeSpan(n-l),t.f44=t.span.days/365.25+(t.f34+t.f35)),t.f51=t.f23,t.f52=0,null!==e.nudge_dollars&&(t.f52=e.nudge_dollars),t.f53=t.f25,t.f56=t.f28,t.f57=t.f29,t.f55=null,null!==t.f57&&null!==t.f56&&(t.f55=(1+t.f57)/(1+t.f56)-1),t.f58=null,null!==t.f55&&null!==t.f53&&(t.f58=Math.pow(1+t.f55,1/t.f53)-1),t.f59=null,null!==t.f56&&null!==t.f53&&(t.f59=Math.pow(1+t.f56,1/t.f53)-1),t.f60=null,null!==t.f57&&null!==t.f53&&(t.f60=Math.pow(1+t.f57,1/t.f53)-1),t.f67=t.f39,t.f63=t.f35,t.f62=null,this.check_vars([t.f67,t.f60,t.f52,t.f51,t.f57,t.f63,t.f60],"work.f62")&&(t.f62=Math.log((t.f67*t.f60+t.f52)/(t.f52+t.f51*(Math.pow(1+t.f57,t.f63)*t.f60)))/Math.log(1+t.f57)),t.f65=null,null!==t.f51&&null!==t.f55&&null!==t.f56&&null!==t.f62&&null!==t.f63&&(t.f65=t.f51*Math.pow((1+t.f55)*(1+t.f56),t.f62+t.f63)),t.g65=null,null!==t.f51&&null!==t.f55&&null!==t.f62&&null!==t.f63&&(t.g65=t.f51*Math.pow(1+t.f55,t.f62+t.f63)),t.f66=null,null!==t.f67&&null!==t.f65&&(t.f66=t.f67-t.f65),t.g67=null,null!==t.f67&&null!==t.f28&&null!==t.f62&&null!==t.f63&&(t.g67=t.f67*Math.pow(1+t.f28,-(t.f62+t.f63))),t.g66=null,null!==t.g67&&null!==t.g65&&(t.g66=t.g67-t.g65),t.f69=null,null!==t.f51&&null!==t.f52&&null!==t.f53&&null!==t.f62&&(t.f69=t.f51+t.f52*t.f53*t.f62),t.g69=null,null!==t.f52&&null!==t.f56&&null!==t.f62&&null!==t.f59&&null!==t.f63&&null!==t.f51&&(t.g69=t.f52*(1-Math.pow(1+t.f56,-t.f62))/t.f59*Math.pow(1+t.f56,-t.f63)+t.f51),t.f70=null,null!==t.f67&&null!==t.f69&&(t.f70=t.f67-t.f69),t.g70=null,null!==t.g67&&null!==t.g69&&(t.g70=t.g67-t.g69),t.f72=null,null!==t.span&&null!==t.b34&&null!==t.b35&&(l=Date.parse("15-"+e.age_month+"-"+e.age_year),n=Date.today(),l.setHours(0,0,0),n.setHours(0,0,0),t.span=new TimeSpan(n-l),t.f72=t.span.getDays()/365.25+(t.f62+t.f63)),debug&&console.log("><<<>>><<<>>><<<>>>Workings<<<>>><<<>>><<<>>><"),0===t.type?(debug&&console.log("** Regular Mode **"),debug&&console.log("B23: "+t.b23),debug&&console.log("B24: "+t.b24),debug&&console.log("B25: "+t.b25),debug&&console.log("B27: "+t.b27),debug&&console.log("B28: "+t.b28),debug&&console.log("B29: "+t.b29),debug&&console.log("B31: "+t.b31),debug&&console.log("B32: "+t.b32),debug&&console.log("B34: "+t.b34),debug&&console.log("B35: "+t.b35),debug&&console.log("B37: "+t.b37+" C37: "+t.c37),debug&&console.log("B38: "+t.b38+" C38: "+t.c38),debug&&console.log("B39: "+t.b39+" C39: "+t.c39),debug&&console.log("B41: "+t.b41+" C41: "+t.c41),debug&&console.log("B42: "+t.b42+" C42: "+t.c42),debug&&console.log("B44: "+t.b44),debug&&console.log("=============Nudge======================"),debug&&console.log("B51: "+t.b51),debug&&console.log("B52: "+t.b52),debug&&console.log("B53: "+t.b53),debug&&console.log("B55: "+t.b55),debug&&console.log("B56: "+t.b56),debug&&console.log("B57: "+t.b57),debug&&console.log("B58: "+t.b58),debug&&console.log("B59: "+t.b59),debug&&console.log("B60: "+t.b60),debug&&console.log("B62: "+t.b62),debug&&console.log("B63: "+t.b63),debug&&console.log("B65: "+t.b65+" C65: "+t.c65),debug&&console.log("B66: "+t.b66+" C66: "+t.c66),debug&&console.log("B67: "+t.b67+" C67: "+t.c67),debug&&console.log("B69: "+t.b69+" C69: "+t.c69),debug&&console.log("B70: "+t.b70+" C70: "+t.c70),debug&&console.log("B72: "+t.b72)):1===e.type&&(debug&&console.log("** Goal Mode **"),debug&&console.log("F23: "+t.f23),debug&&console.log("F24: "+t.f24),debug&&console.log("F25: "+t.f25),debug&&console.log("F27: "+t.f27),debug&&console.log("F28: "+t.f28),debug&&console.log("F29: "+t.f29),debug&&console.log("F30: "+t.f30),debug&&console.log("F31: "+t.f31),debug&&console.log("F32: "+t.f32),debug&&console.log("F34: "+t.f34),debug&&console.log("F35: "+t.f35),debug&&console.log("F37: "+t.f37+" G37: "+t.g37),debug&&console.log("F38: "+t.f38+" G38: "+t.g38),debug&&console.log("F39: "+t.f39+" G39: "+t.g39),debug&&console.log("F41: "+t.f41+" G41: "+t.g41),debug&&console.log("F42: "+t.f42+" G42: "+t.g42),debug&&console.log("F44: "+t.f44),debug&&console.log("=============Nudge======================"),debug&&console.log("F51: "+t.f51),debug&&console.log("F52: "+t.f52),debug&&console.log("F53: "+t.f53),debug&&console.log("F55: "+t.f55),debug&&console.log("F56: "+t.f56),debug&&console.log("F57: "+t.f57),debug&&console.log("F58: "+t.f58),debug&&console.log("F59: "+t.f59),debug&&console.log("F60: "+t.f60),debug&&console.log("F62: "+t.f62),debug&&console.log("F63: "+t.f63),debug&&console.log("F65: "+t.f65+" G65: "+t.g65),debug&&console.log("F66: "+t.f66+" G66: "+t.g66),debug&&console.log("F67: "+t.f67+" G67: "+t.g67),debug&&console.log("F69: "+t.f69+" G69: "+t.g69),debug&&console.log("F70: "+t.f70+" G70: "+t.g70),debug&&console.log("F72: "+t.f72)),0===t.type?(debug&&console.log("-----------------Regular ---------------->"),t.total=t.b39,t.inflation_adjusted===!0&&(t.total=t.c39),t.contributions=t.b41,t.inflation_adjusted===!0&&(t.contributions=t.c41),t.interest=t.b42,t.nudge_interest=t.b70,t.nudge_total_saved=t.b67,t.inflation_adjusted===!0&&(t.contributions=t.c41,t.interest=t.c42,t.nudge_interest=t.c70,t.nudge_total_saved=t.c67),o.total=this.round(t.total,2),o.contributions=this.round(t.contributions,2),o.interest=this.round(t.interest,2),o.period=Math.ceil(12*t.b34,2),o.age=this.trunc(t.b44),o.total_saved=null,o.nudge_age=this.trunc(t.b72),o.nudge_interest=this.round(t.nudge_interest,2),o.nudge_period=this.round_negative(12*t.b62,2),o.nudge_total=e.nudge_dollars,o.nudge_total_saved=this.round(t.nudge_total_saved,2)):(debug&&console.log("-----------------Goal ---------------->"),t.total=t.f24,t.contributions=t.f39,t.interest=t.f42,t.nudge_interest=t.f70,t.nudge_total_saved=t.f67,t.inflation_adjusted===!0&&(t.contributions=t.g39,t.interest=t.g42,t.nudge_interest=t.g70,t.nudge_total_saved=t.g67),o.contributions=null,o.total=this.round(t.total,2),o.total_saved=this.round(t.contributions,2),o.interest=this.round(t.interest,2),o.period=Math.ceil(12*(t.f34+t.f35),0),o.age=this.trunc(t.f44),o.nudge_age=this.trunc(t.f72),o.nudge_interest=this.round(t.nudge_interest,2),o.nudge_period=this.roundUP(12*(t.f62+t.f63),0),o.nudge_total=e.nudge_dollars,o.nudge_total_saved=this.round(t.nudge_total_saved,2)),0===o.age&&(o.age=null),debug&&console.log("______________Returned Output Object______________________"),debug&&console.dir(o),o}}),testmode=!1,testObj1={type:"1",saving_amount:"5000",regular_amount:"",saving_freq:26,starting:"21/12/2011",ending:"21/12/2015",initial_savings:100,interest_rate:2,age_month:6,age_year:1985,iar:0,nudge_dollars:50,expected:{age:30,contributions:null,interest:195.64,period:37,total:45.23,total_saved:5e3,nudge_age:30,nudge_interest:177.54,nudge_period:32,nudge_total:50,nudge_total_saved:5e3}},testObj2={type:"0",saving_amount:"",regular_amount:"50.13",saving_freq:"52",starting:"28/11/2012",ending:"28/01/2013",initial_savings:"0",interest_rate:"2",age_month:"6",age_year:"1985",iar:0,nudge_dollars:"60",expected:{age:27,contributions:50.13,interest:.63,period:2,total:435.09,total_saved:"",nudge_age:27,nudge_interest:.76,nudge_period:2,nudge_total:60,nudge_total_saved:520.76}},testObj3={type:"1",saving_amount:"52",regular_amount:"",saving_freq:"52",starting:"01/01/2013",ending:"01/01/2014",initial_savings:"0",interest_rate:"14.7",age_month:"11",age_year:"1984",iar:0,nudge_dollars:"300",expected:{age:29,contributions:null,interest:3.42,period:13,total:.93,total_saved:52,nudge_age:28,nudge_interest:-.06,nudge_period:1,nudge_total:300,nudge_total_saved:52}},testObj4={type:"1",saving_amount:"5000",regular_amount:"",saving_freq:"52",starting:"04/01/2013",ending:"13/03/2013",initial_savings:"200",interest_rate:"5.2",age_month:"1",age_year:"1913",iar:1,nudge_dollars:530,expected:{age:100,contributions:null,interest:14.25,period:4,total:480.15,total_saved:5e3,nudge_age:100,nudge_interest:12.83,nudge_period:3,nudge_total:530,nudge_total_saved:4976.8}},testObj5={type:"0",saving_amount:"",regular_amount:"1",saving_freq:"52",starting:"31/01/2020",ending:"31/01/2021",initial_savings:"",interest_rate:"2",age_month:"1",age_year:"2000",iar:0,nudge_dollars:10,expected:{age:21,contributions:1,interest:.51,period:12,total:52.51,total_saved:"",nudge_age:21,nudge_interest:5.08,nudge_period:12,nudge_total:10,nudge_total_saved:525.08}},testObj6={type:"0",saving_amount:"52",regular_amount:"100",saving_freq:"52",starting:"31/01/2020",ending:"31/01/2021",initial_savings:"",interest_rate:"2",age_month:"1",age_year:"2000",iar:0,nudge_dollars:110,expected:{age:21,contributions:100,interest:50.83,period:12,total:5250.83,total_saved:"",nudge_age:21,nudge_interest:55.91,nudge_period:12,nudge_total:110,nudge_total_saved:5775.91}};testmode===!0&&function(e){"use strict";function l(){var l,n,t=new SortedCalculator_Savings,o=testObj3,a=t.calculate(o);if("one"==="all")o=testObj6,a=t.calculate(o,!0),console.debug=!0,debug&&console.log("><><><><> INPUT <><><><><"),debug&&console.dir(o),debug&&console.log("><><><><> OUTPUT <><><><><"),debug&&console.dir(a),console.debug=!1;else{for(l=1;l<=9;l+=1)debug&&console.log("testing case"+l),o=window["testObj"+l],a[l]=t.calculate(o,!0),n="<div style='padding: 40px; background: #eee; color:#333; font-family: verdana;'><a name='testresults"+l+"'></a><h2>Test Case "+l+"</h2>",a[l].age===o.expected.age?n+="<p>Age: <span style='color:green'>PASS</span> "+a[l].age+"</p>":n+="<p>Age: <span style='color:red'>FAIL</span> "+a[l].age+" != "+o.expected.age+"</p>",a[l].interest===o.expected.interest?n+="<p>Interest: <span style='color:green'>PASS</span> "+a[l].interest+"</p>":n+="<p>Interest: <span style='color:red'>FAIL</span> "+a[l].interest+" != "+o.expected.interest+"</p>",a[l].period===o.expected.period?n+="<p>Period: <span style='color:green'>PASS</span> "+a[l].period+"</p>":n+="<p>Period: <span style='color:red'>FAIL</span> "+a[l].period+" != "+o.expected.period+"</p>",a[l].total===o.expected.total?n+="<p>Total: <span style='color:green'>PASS</span> "+a[l].total+"</p>":n+="<p>Total: <span style='color:red'>FAIL</span> "+a[l].total+" != "+o.expected.total+"</p>",n+="<p>Nudge</p>",a[l].nudge_age===o.expected.nudge_age?n+="<p>nudge_Age: <span style='color:green'>PASS</span> "+a[l].nudge_age+"</p>":n+="<p>nudge_Age: <span style='color:red'>FAIL</span> "+a[l].nudge_age+" != "+o.expected.nudge_age+"</p>",a[l].nudge_interest===o.expected.nudge_interest?n+="<p>nudge_Interest: <span style='color:green'>PASS</span> "+a[l].nudge_interest+"</p>":n+="<p>nudge_Interest: <span style='color:red'>FAIL</span> "+a[l].nudge_interest+" != "+o.expected.nudge_interest+"</p>",a[l].nudge_period===o.expected.nudge_period?n+="<p>nudge_Period: <span style='color:green'>PASS</span> "+a[l].nudge_period+"</p>":n+="<p>nudge_Period: <span style='color:red'>FAIL</span> "+a[l].nudge_period+" != "+o.expected.nudge_period+"</p>",a[l].nudge_total===o.expected.nudge_total?n+="<p>nudge_Total: <span style='color:green'>PASS</span> "+a[l].nudge_total+"</p>":n+="<p>nudge_Total: <span style='color:red'>FAIL</span> "+a[l].nudge_total+" != "+o.expected.nudge_total+"</p>",a[l].nudge_total_saved===o.expected.nudge_total_saved?n+="<p>nudge_Total Saved: <span style='color:green'>PASS</span> "+a[l].nudge_total_saved+"</p>":n+="<p>nudge_Total Saved: <span style='color:red'>FAIL</span> "+a[l].nudge_total_saved+" != "+o.expected.nudge_total_saved+"</p>",n+="</div>",e("html").append(n),console.debug=!0,debug&&console.log("><><><><> INPUT "+l+" <><><><><"),debug&&console.dir(o),debug&&console.log("><><><><> OUTPUT "+l+" <><><><><"),debug&&console.dir(a),console.debug=!1;window.location=window.location+"#testresults"+(l-1)}}e(document).ready(function(){e("html").append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />")}),e("#calculate-test").live("click",function(){l()})}(jQuery);