var SortedCalculator_KiwiSaver_Fees=SortedCalculator.extend({ui:{},init:function(){"use strict";console.debug=!0,this._super(),this.test_mode===!0&&this.test_calc()},test_mode:!0,check_vars:function(e,r){"use strict";var s;for(s=0;s<e.length;s+=1)if(null===e[s]||void 0===e[s])return!1;return!0},model:{},risk_profile:function(e){"use strict";var r=5;return e=parseFloat(e),e<.9&&(r=4),e<.7&&(r=3),e<.5&&(r=2),e<.3&&(r=1),r},get_pir:function(e){"use strict";return e=Number(e),e>48001?.28:e>14001?.175:.105},get_ecst:function(e){"use strict";return e>84e3?.33:e>57600?.3:e>16800?.175:.105},get_risk_profile_label:function(e){"use strict";switch(e){case 1:return"Defensive";case 2:return"Conservative";case 3:return"Balanced";case 4:return"Growth";case 5:return"Aggressive";case 0:return"All";default:return!1}},get_net_returns:function(e){"use strict";switch(e){case.105:return{nz_shares:.0682,oseas_shares:.0797,prop_nz:.0561,prop_global:.0597,alt_growth:.0672,alt_income:.0672,alt_other:.0672,nz_fixed:.0359,oseas_fixed:.0404,cash:.0336};case.175:return{nz_shares:.0637,oseas_shares:.0762,prop_nz:.0519,prop_global:.0562,alt_growth:.0645,alt_income:.0645,alt_other:.0645,nz_fixed:.0331,oseas_fixed:.0373,cash:.0309};case.28:return{nz_shares:.0569,oseas_shares:.0709,prop_nz:.0456,prop_global:.0508,alt_growth:.0605,alt_income:.0605,alt_other:.0605,nz_fixed:.029,oseas_fixed:.0326,cash:.027};default:return!1}},employer_withholding_tax:function(e,r){"use strict";var s={};switch(r){case 1:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i27*e.e23+e.i28*(1-e.e23)),s.compulsory=e.j27*e.e23+e.j28*(1-e.e23)),s;case 2:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i28*e.e23+e.i29*(1-e.e23)),s.compulsory=e.j28*e.e23+e.j29*(1-e.e23)),s;case 3:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i29*e.e23+e.i30*(1-e.e23)),s.compulsory=e.j29*e.e23+e.j30*(1-e.e23)),s;case 4:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i30*e.e23+e.i31*(1-e.e23)),s.compulsory=e.j30*e.e23+e.j31*(1-e.e23)),s;case 5:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i30*e.e23+e.i31*(1-e.e23)),s.compulsory=e.j30*e.e23+e.j31*(1-e.e23)),s;default:return s.non_compulsory=0,s.compulsory=0,e.b27>0&&(s.non_compulsory=Math.min(.03,e.i30*e.e23+e.i31*(1-e.e23)),s.compulsory=e.j30*e.e23+e.j31*(1-e.e23)),s}},generate_map:function(e,r){"use strict";var s,o,i,t,d={};for(e.providers[r].rows={},s=1;s<=e.b37;s+=1){if(e.providers[r].rows[s]={},e.providers[r].rows[s].a=s,e.providers[r].rows[s].b=null,this.check_vars([e.b22,e.b23],"model.providers["+s+"].b")&&(e.providers[r].rows[s].b=e.b22*Math.pow(1+e.b23,s-.5)),e.providers[r].rows[s].c=null,s>1?this.check_vars([e.providers[r].rows[s-1].r],"model.providers["+s+"].c")&&(e.providers[r].rows[s].c=e.providers[r].rows[s-1].r):e.providers[r].rows[s].c=0,e.providers[r].rows[s].d=null,e.providers[r].rows[s].e=null,e.providers[r].rows[s].f=null,e.employment?(this.check_vars([e.b26,e.providers[r].rows[s].b],"m["+s+"].d - employed")&&(e.providers[r].rows[s].d=e.b26*e.providers[r].rows[s].b),t=this.employer_withholding_tax(e,s),this.check_vars(t,"m["+s+"].e - employed")&&(e.providers[r].rows[s].e=t.non_compulsory*e.providers[r].rows[s].b),this.check_vars(t,"m["+s+"].f - employed")&&(e.providers[r].rows[s].f=t.compulsory*(1-e.g32)*e.providers[r].rows[s].b)):(this.check_vars([e.b30,e.b31],"model.providers["+s+"].d - unemployed")&&(e.b32?e.providers[r].rows[s].d=e.b30*e.b31*Math.pow(1+e.b24,e.providers[r].rows[s].a-1):e.providers[r].rows[s].d=e.b30*e.b31),e.providers[r].rows[s].e=0,e.providers[r].rows[s].f=0),e.providers[r].rows[s].g=0,e.providers[r].rows[s].i=0,e.providers[r].rows[s].aa=e.providers[r].rows[s].e,e.providers[r].rows[s].ab=e.providers[r].rows[s].g,e.providers[r].rows[s].ad=e.providers[r].rows[s].i,e.providers[r].rows[s].am=parseFloat(e.providers[r].t.aa_nz_au_s),e.providers[r].rows[s].an=parseFloat(e.providers[r].t.aa_oss_s),e.providers[r].rows[s].ao=parseFloat(e.providers[r].t.aa_prop_nz),e.providers[r].rows[s].ap=parseFloat(e.providers[r].t.aa_prop_global),e.providers[r].rows[s].aq=parseFloat(e.providers[r].t.aa_alt_growth),e.providers[r].rows[s].ar=parseFloat(e.providers[r].t.aa_alt_income),e.providers[r].rows[s].as=parseFloat(e.providers[r].t.aa_alt_other),e.providers[r].rows[s].at=parseFloat(e.providers[r].t.aa_nzfi),e.providers[r].rows[s].au=parseFloat(e.providers[r].t.aa_osfi),e.providers[r].rows[s].av=parseFloat(e.providers[r].t.aa_cash),e.providers[r].rows[s].aw=null,this.check_vars([e.providers[r].rows[s].am,e.providers[r].rows[s].an,e.providers[r].rows[s].ao,e.providers[r].rows[s].ap,e.providers[r].rows[s].aq,e.providers[r].rows[s].as],"model.providers["+r+"][rows]["+s+"].aw")&&0!==e.providers[r].rows[s].as&&(e.providers[r].rows[s].aw=this.sum_array([e.providers[r].rows[s].am,e.providers[r].rows[s].an,e.providers[r].rows[s].ao,e.providers[r].rows[s].ap,e.providers[r].rows[s].aq,e.providers[r].rows[s].as/2])),e.providers[r].rows[s].ay=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).nz_shares,e.providers[r].rows[s].az=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).oseas_shares,e.providers[r].rows[s].ba=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).prop_nz,e.providers[r].rows[s].bb=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).prop_global,e.providers[r].rows[s].bc=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).alt_growth,e.providers[r].rows[s].bd=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).alt_income,e.providers[r].rows[s].be=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).alt_other,e.providers[r].rows[s].bf=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).nz_fixed,e.providers[r].rows[s].bg=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).oseas_fixed,e.providers[r].rows[s].bh=this.get_net_returns(this.get_pir(e.providers[r].rows[s].b)).cash,e.providers[r].rows[s].bi=this.sum_product([e.providers[r].rows[s].am,e.providers[r].rows[s].an,e.providers[r].rows[s].ao,e.providers[r].rows[s].ap,e.providers[r].rows[s].aq,e.providers[r].rows[s].ar,e.providers[r].rows[s].as,e.providers[r].rows[s].at,e.providers[r].rows[s].au,e.providers[r].rows[s].av],[e.providers[r].rows[s].ay,e.providers[r].rows[s].az,e.providers[r].rows[s].ba,e.providers[r].rows[s].bb,e.providers[r].rows[s].bc,e.providers[r].rows[s].bd,e.providers[r].rows[s].be,e.providers[r].rows[s].bf,e.providers[r].rows[s].bg,e.providers[r].rows[s].bh]),e.providers[r].rows[s].j=null,1===s?this.check_vars([e.b34,e.e34,e.providers[r].rows[s].d],"model.providers["+r+"][rows"+s+"].j.1")&&(e.providers[r].rows[s].j=Math.min(e.b34*e.e34,e.providers[r].rows[s].d*e.e34)):this.check_vars([e.b34,e.e34,e.providers[r].rows[s].d,e.providers[r].rows[s-1].d],"model.providers["+r+"][rows"+s+"].j.2")&&(e.providers[r].rows[s].j=Math.min(e.b34,e.providers[r].rows[s].d*e.e34+e.providers[r].rows[s-1].d*(1-e.e34))),e.providers[r].rows[s].h=null,this.check_vars([e.providers[r].rows[s].c,e.providers[r].rows[s].bi,e.providers[r].rows[s].d,e.providers[r].rows[s].e,e.providers[r].rows[s].f,e.providers[r].rows[s].g,e.providers[r].rows[s].i,e.providers[r].rows[s].j,e.e34],"model.providers["+r+"].rows["+s+"].h")&&(e.providers[r].rows[s].h=e.providers[r].rows[s].c*e.providers[r].rows[s].bi+this.sum_array([e.providers[r].rows[s].d,e.providers[r].rows[s].e,e.providers[r].rows[s].f])*(Math.pow(1+e.providers[r].rows[s].bi,.5)-1)+e.providers[r].rows[s].g*(Math.pow(1+e.providers[r].rows[s].bi,.75)-1)+e.providers[r].rows[s].i*(Math.pow(1+e.providers[r].rows[s].bi,.75)-1)+e.providers[r].rows[s].j*(Math.pow(1+e.providers[r].rows[s].bi,1-e.e34)-1)),e.providers[r].rows[s].bj=1/(1+e.providers[r].rows[s].bi),e.providers[r].rows[s].bk=1===this.sum_array([e.providers[r].rows[s].am,e.providers[r].rows[s].an,e.providers[r].rows[s].ao,e.providers[r].rows[s].ap,e.providers[r].rows[s].aq,e.providers[r].rows[s].ar,e.providers[r].rows[s].as,e.providers[r].rows[s].at,e.providers[r].rows[s].au,e.providers[r].rows[s].av]),e.providers[r].rows[s].bl=e.providers[r].rows[s].d/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].bm=e.providers[r].rows[s].e/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].bn=e.providers[r].rows[s].g/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].bo=e.providers[r].rows[s].h/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].bp=e.providers[r].rows[s].i/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].bq=e.providers[r].rows[s].j/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].br=e.providers[r].rows[s].v,s>1?(i=s-1,e.providers[r].rows[s].j=Math.min(e.b34,e.providers[r].rows[s].d*e.e34+e.providers[r].rows[i].d*(1-e.e34))):e.providers[r].rows[s].j=Math.min(e.b34*e.e34,e.providers[r].rows[s].d*e.e34),e.providers[r].rows[s].y=null,1===s?this.check_vars([e.providers[r].rows[s].c],"model.providers["+r+"].rows["+s+"].y")&&(e.providers[r].rows[s].y=e.providers[r].rows[s].c):this.check_vars([e.providers[r].rows[s-1].af],"model.providers["+r+"].rows["+s+"].y")&&(e.providers[r].rows[s].y=e.providers[r].rows[s-1].af),e.providers[r].rows[s].z=e.providers[r].rows[s].d,o=this.average_array([e.providers[r].rows[s].c,this.sum_array([e.providers[r].rows[s].c,e.providers[r].rows[s].d,e.providers[r].rows[s].e,e.providers[r].rows[s].f,e.providers[r].rows[s].g,e.providers[r].rows[s].h,e.providers[r].rows[s].i,e.providers[r].rows[s].j])])*Math.pow(1+e.providers[r].rows[s].bi,.5),i=o>3e4?e.providers[r].t.fee_invest_30000:o>4500?e.providers[r].t.fee_invest_4500:e.providers[r].t.fee_invest_0,e.providers[r].rows[s].k=i*o,e.providers[r].rows[s].l=e.providers[r].t.fee_trustee*o,e.providers[r].rows[s].m=e.providers[r].t.fee_admin*o,e.providers[r].rows[s].n=12*e.providers[r].t.fee_member*Math.pow(1+e.inflation_rate,e.providers[r].rows[s].a-1)*Math.pow(1+e.providers[r].rows[s].bi,.5),e.providers[r].rows[s].o=e.providers[r].t.fee_infund*o,0===e.providers[r].t.fee_min?e.providers[r].rows[s].p=0:this.sum_array([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o])<e.providers[r].t.fee_min?e.providers[r].rows[s].p=e.providers[r].t.fee_min-this.sum_array([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o]):e.providers[r].rows[s].p=0,e.providers[r].rows[s].q=null,this.check_vars([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o,e.providers[r].rows[s].p,e.providers[r].c40],"m["+s+"].q")&&(e.providers[r].rows[s].q=this.sum_array([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o,e.providers[r].rows[s].p])*(1-e.providers[r].c40)),e.providers[r].rows[s].ae=e.providers[r].rows[s].j,e.providers[r].rows[s].ac=null,this.check_vars([e.providers[r].rows[s].y,e.providers[r].rows[s].bi,e.providers[r].rows[s].z,e.providers[r].rows[s].aa,e.providers[r].rows[s].ab,e.providers[r].rows[s].ad],"model.providers["+r+"].rows["+s+"].ac")&&(e.providers[r].rows[s].ac=e.providers[r].rows[s].y*e.providers[r].rows[s].bi+this.sum_array([e.providers[r].rows[s].z,e.providers[r].rows[s].aa])*(Math.pow(1+e.providers[r].rows[s].bi,.5)-1)+e.providers[r].rows[s].ab*(Math.pow(1+e.providers[r].rows[s].bi,.75)-1)+e.providers[r].rows[s].ad/2*(Math.pow(1+e.providers[r].rows[s].bi,.5)-1)),e.providers[r].rows[s].af=this.sum_array([e.providers[r].rows[s].y,e.providers[r].rows[s].z,e.providers[r].rows[s].aa,e.providers[r].rows[s].ab,e.providers[r].rows[s].ac,e.providers[r].rows[s].ad,e.providers[r].rows[s].ae]),e.providers[r].rows[s].ag=e.providers[r].rows[s].af/Math.pow(1+e.inflation_rate,s),e.providers[r].rows[s].r=null,this.check_vars([e.providers[r].rows[s].c,e.providers[r].rows[s].d,e.providers[r].rows[s].e,e.providers[r].rows[s].f,e.providers[r].rows[s].g,e.providers[r].rows[s].h,e.providers[r].rows[s].i,e.providers[r].rows[s].j,e.providers[r].rows[s].q],"m["+s+"].r")&&(e.providers[r].rows[s].r=this.sum_array([e.providers[r].rows[s].c,e.providers[r].rows[s].d,e.providers[r].rows[s].e,e.providers[r].rows[s].f,e.providers[r].rows[s].g,e.providers[r].rows[s].h,e.providers[r].rows[s].i,e.providers[r].rows[s].j])-e.providers[r].rows[s].q),e.providers[r].rows[s].ah=e.providers[r].rows[s].af-e.providers[r].rows[s].r,e.providers[r].rows[s].ai=e.providers[r].rows[s].ah/Math.pow(1+e.b24,s),e.providers[r].rows[s].ak=this.get_pir(e.providers[r].rows[s].b)*e.providers[r].t.expense_before_tax,e.providers[r].rows[s].al=parseInt(e.providers[r].t.risk_profile,10),e.providers[r].rows[s].s=null,this.check_vars([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o,e.providers[r].rows[s].bi,e.providers[r].rows[s].p,e.providers[r].c40],"model.providers["+r+"][rows]["+s+"].s")&&(e.providers[r].rows[s].s=(this.sum_array([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o])/Math.pow(1+e.providers[r].rows[s].bi,.5)+e.providers[r].rows[s].p)*(1-e.providers[r].c40)),e.providers[r].rows[s].t=null,o=0,1===s)e.providers[r].rows[s].t=e.providers[r].rows[s].s;else{for(i=1;i<s;i+=1)o+=e.providers[r].rows[i].s;e.providers[r].rows[s].t=o+e.providers[r].rows[s].s}for(e.providers[r].rows[s].u=null,this.check_vars([e.providers[r].rows[s].r,e.inflation_rate,e.providers[r].rows[s].a],"model.providers["+r+"].rows["+s+"].u")&&(e.providers[r].rows[s].u=e.providers[r].rows[s].r/Math.pow(1+e.inflation_rate,e.providers[r].rows[s].a)),e.providers[r].rows[s].v=null,this.check_vars([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o,e.providers[r].rows[s].bi,e.providers[r].rows[s].p,e.providers[r].c40,e.inflation_rate,e.providers[r].rows[s].a],"model.providers["+r+"][rows]["+s+"].v")&&(e.providers[r].rows[s].v=(this.sum_array([e.providers[r].rows[s].k,e.providers[r].rows[s].l,e.providers[r].rows[s].m,e.providers[r].rows[s].n,e.providers[r].rows[s].o])/Math.pow(1+e.providers[r].rows[s].bi,.5)+e.providers[r].rows[s].p)*(1-e.providers[r].c40)/Math.pow(1+e.inflation_rate,e.providers[r].rows[s].a)),e.providers[r].rows[s].w=0,e.providers[r].rows[s].x="",o=1;o<=s;o+=1)e.providers[r].rows[s].w+=e.providers[r].rows[o].v;e.providers[r].rows[s].br=e.providers[r].rows[s].v,e.providers[r].l4=this.round_negative(e.providers[r].rows[s].w,-1),e.providers[r].j4=this.round_negative(e.providers[r].rows[s].u,-2),e.providers[r].o4=this.round_negative(e.providers[r].rows[s].t,-1),e.providers[r].n4=this.round_negative(e.providers[r].rows[s].r,-2)}return d},interrupt:!1,calculating:!1,calculate:function(e){"use strict";var r=this;return this.test_mode===!0&&(console.debug=!0),this.calculating===!0?(this.interrupt=!0,void setTimeout(function(){r.calculate(e)},50)):this.ui.calculating===!0?(this.ui.interrupt=!0,void setTimeout(function(){r.calculate(e)},50)):void this._calculate(e)},_calculate:function(e){"use strict";var r,s,o,i;return this.calculating=!0,e={month_born:isNaN(parseInt(e.month_born,10))?null:parseInt(e.month_born,10),year_born:isNaN(parseInt(e.year_born,10))?null:parseInt(e.year_born,10),employment:e.employment===!0,salary:isNaN(parseInt(e.salary,10))?null:parseInt(e.salary,10),earnings:isNaN(parseInt(e.earnings,10))?null:parseInt(e.earnings,10),contrib_freq:isNaN(parseInt(e.contrib_freq,10))?null:parseInt(e.contrib_freq,10),contrib:isNaN(parseInt(e.contrib,10))?null:parseInt(e.contrib,10),employee_contrib:isNaN(parseInt(e.employee_contrib,10))?null:parseInt(e.employee_contrib,10),employer_contrib:isNaN(parseInt(e.employer_contrib,10))?null:parseInt(e.employer_contrib,10),risk_profile:isNaN(parseInt(e.risk_profile,10))?null:parseInt(e.risk_profile,10),iac:e.iac===!0},o=0,jQuery.each(e,function(r,s){if(e.employment===!0)null===s&&"earnings"!==r&&"contrib"!==r&&"contrib_freq"!==r&&(o+=1);else{if(e.employment!==!1)return this.model.results=!1,this.calculating=!1,this.interrupt=!1,void $(document).trigger("ksfcalcend");null===s&&"salary"!==r&&(o+=1)}}),o>0?(this.model.results=!1,this.calculating=!1,this.interrupt=!1,void $(document).trigger("ksfcalcend")):(this.model.age=this.get_age("01/"+e.month_born+"/"+e.year_born),this.model.age>=65?(console.log("this.model.age >= 65"),this.model.results=!1,this.calculating=!1,this.interrupt=!1,void $(document).trigger("ksfcalcend")):(this.model.inflation_rate=.02,this.model.employment=e.employment,this.model.b22=e.employment?e.salary:e.earnings,this.model.b23=constants.salary_inflation_pa,this.model.b24=this.model.inflation_rate,this.model.b26=e.employee_contrib/100,this.model.b27=e.employer_contrib/100,this.model.b30=e.employment?0:e.contrib,this.model.b31=e.employment?0:e.contrib_freq,this.model.b32=e.employment?0:e.iac,this.model.b34=10/7*365,this.model.b36=this.model.age,this.model.b37=constants.retire_age-this.model.age,this.model.c40=this.get_pir(this.model.b22),this.model.c48=.002,this.model.d22=Date.today(),this.model.d22.toString("M")<4?this.model.d23=Date.parse("01-04-"+Date.today().toString("yyyy")):this.model.d23=Date.parse("01-04-"+Date.today().addYears(1).toString("yyyy")),this.model.d24=Date.today().addYears(1),this.model.d34=null,this.check_vars([this.model.d22],"d34")&&(this.model.d22.toString("M")<6?this.model.d34=Date.parse("30-06-"+Date.today().toString("yyyy")):this.model.d34=Date.parse("30-06-"+Date.today().addYears(1).toString("yyyy"))),this.model.e23=null,this.check_vars([this.model.d22,this.model.d23,this.model.d24],"e23")&&(r=new TimeSpan(this.model.d23-this.model.d22),s=new TimeSpan(this.model.d24-this.model.d22),this.model.e23=(r.getDays()+1)/s.getDays()),this.model.h27=null,this.check_vars([this.model.d23],"h27")&&(this.model.h27=new Date(this.model.d23.getTime()),this.model.h27.addYears(-1)),this.model.h28=null,this.check_vars([this.model.h27],"h28")&&(this.model.h28=new Date(this.model.h27.getTime()),this.model.h28.addYears(1)),this.model.h29=null,this.check_vars([this.model.h28],"h28")&&(this.model.h29=new Date(this.model.h28.getTime()),this.model.h29.addYears(1)),this.model.h30=null,this.check_vars([this.model.h29],"")&&(this.model.h30=new Date(this.model.h29.getTime()),this.model.h30.addYears(1)),this.model.h31=null,this.check_vars([this.model.h30],"")&&(this.model.h31=new Date(this.model.h30.getTime()),this.model.h31.addYears(1)),this.model.i27=0,this.model.i28=0,this.model.i29=0,this.model.i30=0,this.model.i31=0,this.model.i45=null,this.check_vars([this.model.b37],"i45")&&(this.model.i45=this.model.b37),this.model.j27=this.model.b27,this.model.j28=null,this.check_vars([this.model.h28,this.model.b27,this.model.i28],"j28")&&(this.model.j28=Math.max(0,this.model.b27-this.model.i28),this.model.h28.toString("yyyy")>2012&&(this.model.j28=Math.max(.03,this.model.b27-this.model.i28))),this.model.j29=null,this.check_vars([this.model.h29,this.model.b27,this.model.i29],"j29")&&(this.model.j29=Math.max(0,this.model.b27-this.model.i29),this.model.h29.toString("yyyy")>2012&&(this.model.j29=Math.max(.03,this.model.b27-this.model.i29))),this.model.j30=null,this.check_vars([this.model.h30,this.model.b27,this.model.i30],"J30")&&(this.model.j30=Math.max(0,this.model.b27-this.model.i30),this.model.h30.toString("yyyy")>2012&&(this.model.j30=Math.max(.03,this.model.b27-this.model.i30))),this.model.j31=null,this.check_vars([this.model.b27,this.model.i31],"J31")&&(this.model.j31=Math.max(0,this.model.b27-this.model.i31),this.model.h31.toString("yyyy")>2012&&(this.model.j31=Math.max(.03,this.model.b27-this.model.i31))),this.model.e27=0,this.model.e28=null,this.check_vars([this.model.b27,e.employment,this.model.i28,this.model.e23,this.model.i29],"e28")&&(this.model.e28=0,this.model.b27>0&&e.employment&&(this.model.e28=Math.min(.03,this.model.i28*this.model.e23+this.model.i29*(1-this.model.e23)))),this.model.e29=null,this.check_vars([this.model.b27,e.employment,this.model.i29,this.model.e23,this.model.i30],"e29")&&(this.model.e29=0,this.model.b27>0&&e.employment&&(this.model.e29=Math.min(.03,this.model.i29*this.model.e23+this.model.i30*(1-this.model.e23)))),this.model.e30=null,this.check_vars([this.model.b27,e.employment,this.model.i30,this.model.e23,this.model.i31],"e30")&&(this.model.e30=0,this.model.b27>0&&e.employment&&(this.model.e30=Math.min(.03,this.model.i30*this.model.e23+this.model.i31*(1-this.model.e23)))),this.model.e31=null,this.check_vars([this.model.e30],"e31")&&(this.model.e31=this.model.e30),this.model.e34=null,this.check_vars([this.model.d22,this.model.d24,this.model.d34],"e34")&&(r=new TimeSpan(this.model.d34-this.model.d22),s=new TimeSpan(this.model.d24-this.model.d22),this.model.e34=r.getDays()/s.getDays()),this.model.f27=null,this.check_vars(this.model.b27,"f27")&&(this.model.f27=Math.max(.03,this.model.b27)),this.model.f28=null,this.check_vars([this.model.b27,e.employment,this.model.j28,this.model.e23,this.model.j29],"f28")&&(this.model.f28=0,this.model.b27>0&&e.employment&&(this.model.f28=this.model.j28*this.model.e23+this.model.j29*(1-this.model.e23))),this.model.f29=null,this.check_vars([this.model.b27,e.employment,this.model.j29,this.model.e23,this.model.j30],"f29")&&(this.model.f29=0,this.model.b27>0&&e.employment&&(this.model.f29=this.model.j29*this.model.e23+this.model.j30*(1-this.model.e23))),this.model.f30=null,this.check_vars([this.model.b27,e.employment,this.model.j30,this.model.e23,this.model.j31],"f30")&&(this.model.f30=0,this.model.b27>0&&e.employment&&(this.model.f30=this.model.j30*this.model.e23+this.model.j31*(1-this.model.e23))),this.model.f31=null,this.check_vars([this.model.f30],"f31")&&(this.model.f31=this.model.f30),this.model.g32=this.get_ecst(this.model.b22*(1+this.model.b27)),this.model.risk=e.risk_profile,this.model.providers={},this.model.results={},this.reduced_fees_table={},this.reduced_fees_table_length=0,i=this,jQuery.each(fees_table,function(e,r){r.risk_profile!==i.model.risk&&0!==i.model.risk||(i.reduced_fees_table[e]=r,i.reduced_fees_table_length+=1)}),void setTimeout(function(){i.recurse_map(0)},10)))},recurse_map:function(e){"use strict";var r,s,o,i=0,t=this;if(this.interrupt===!0)return this.interrupt=!1,void(this.calculating=!1);for(r in this.reduced_fees_table)this.reduced_fees_table.hasOwnProperty(r)&&(i===e&&(s=r,o=this.reduced_fees_table[s]),i+=1);return t.model.providers[s]={},t.model.providers[s].b4=o.id,t.model.providers[s].b5=o.scheme,t.model.providers[s].b7=o.fund,t.model.providers[s].b9=o.fee_invest_0,t.model.providers[s].b10=o.fee_invest_4500,t.model.providers[s].b11=o.fee_invest_30000,t.model.providers[s].b12=o.fee_trustee,t.model.providers[s].b13=o.fee_admin,t.model.providers[s].b14=o.fee_member,t.model.providers[s].b15=o.fee_infund,t.model.providers[s].b16=o.fee_min,t.model.providers[s].b18=o.risk_profile,t.model.providers[s].b22=t.model.b22,t.model.providers[s].c39=o.expense_before_tax,t.model.providers[s].c40=t.get_pir(t.model.providers[s].b22),t.model.providers[s].t=o,t.generate_map(t.model,t.model.providers[s].b4),t.model.results[s]={},t.model.results[s].todays={risk:t.get_risk_profile_label(parseInt(o.risk_profile,10)),scheme:o.scheme,fund:o.fund,fees_till_65_dollars:t.round(t.model.providers[s].l4,-1),fees_till_65_percent:t.round(t.model.providers[s].l4/t.model.providers[s].j4*100,1),fees_balance:t.model.providers[s].j4,id:o.id,active:o.active,date_verified:o.verified},t.model.results[s].nominal={risk:t.get_risk_profile_label(parseInt(o.risk_profile,10)),scheme:o.scheme,fund:o.fund,fees_till_65_dollars:t.model.providers[s].o4,fees_till_65_percent:t.round(t.model.providers[s].o4/t.model.providers[s].n4*100,1),fees_balance:t.model.providers[s].o4,id:o.id,active:o.active,date_verified:o.verified},this.interrupt===!0?(this.interrupt=!1,void(this.calculating=!1)):($(document).trigger("ksfcalcprogress",Math.round(100*(e+1)/this.reduced_fees_table_length)),e+1===this.reduced_fees_table_length?(this.calculating=!1,$(document).trigger("ksfcalcend"),void this.test_mode):void setTimeout(function(){t.recurse_map(e+1)},10))},test_calc:function(){"use strict";this.test_mode},test_begin:function(){"use strict";var e,r=[],s=[];for(e=0;e<this.tests.length;e+=1)r[e]=new SortedCalculator_KiwiSaver_Fees,s[e]=r[e].calculate(this.tests[e],!0)},test_check_results:function(e){"use strict";var r,s,o,i,t;for(s=0;s<r[0].expected.length;s+=1)o+=1,i="<div style='clear:both'></div>",i+="<div style='margin:0; background:#000; color:#efefef; margin:20px; padding:20px; border:4px solid #000'>",0===s&&(i+="<div style='float:right; width:200px; padding:10px; maring:5px; background:#efefef; color:#333; font-family:verdana'><h2>Test 1 inputs</h2>",i+="month_born: "+r[0].month_born+"<br />",i+="year_born: "+r[0].year_born+"<br />",i+="risk_profile: "+r[0].risk_profile+"<br />",i+="employment: "+r[0].employment+"<br />",i+="iac: "+r[0].iac+"<br />",i+="//employed<br />",i+="salary: "+r[0].salary+"<br />",i+="employee_contrib: "+r[0].employee_contrib+"<br />",i+="employer_contrib: "+r[0].employer_contrib+"<br />",i+="//unemployed<br />",i+="earnings: "+r[0].earnings+"<br />",i+="contrib_freq: "+r[0].contrib_freq+"<br />",i+="contrib: "+r[0].contrib+"<br />",i+="</div>"),i+="<h1 style='float:left; line-height:40px; font-size:30px; height:40px; color:#555'>Test 1."+o+" </h1>",i+="<div style='clear:left'></div><h3 style='color:#999'>Row: "+r[0].expected[s].row+"</h3>",t=r[0].expected[s].todays.risk===e[0].results[r[0].expected[s].row].todays.risk?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.risk,i+="Todays risk: "+r[0].expected[s].todays.risk+" "+t+"<br />",t=r[0].expected[s].todays.scheme===e[0].results[r[0].expected[s].row].todays.scheme?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.scheme,i+="Todays scheme: "+r[0].expected[s].todays.scheme+" "+t+"<br />",t=r[0].expected[s].todays.fund===e[0].results[r[0].expected[s].row].todays.fund?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.fund,i+="Todays fund: "+r[0].expected[s].todays.fund+" "+t+"<br />",t=r[0].expected[s].todays.fees_till_65_dollars===e[0].results[r[0].expected[s].row].todays.fees_till_65_dollars?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.fees_till_65_dollars,i+="Todays fees till 65 ($): "+r[0].expected[s].todays.fees_till_65_dollars+" "+t+"<br />",t=r[0].expected[s].todays.fees_till_65_percent===e[0].results[r[0].expected[s].row].todays.fees_till_65_percent?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.fees_till_65_percent,i+="Todays fees till 65 (%): "+r[0].expected[s].todays.fees_till_65_percent+" "+t+"<br />",t=r[0].expected[s].todays.active===e[0].results[r[0].expected[s].row].todays.active?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].todays.active,i+="Todays Passive/Active: "+r[0].expected[s].todays.active+" "+t+"<br />",i+="<div style='background:#000; margin:5px; height:10px;'></div>",t=r[0].expected[s].nominal.risk===e[0].results[r[0].expected[s].row].nominal.risk?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.risk,i+="Nominal risk: "+r[0].expected[s].nominal.risk+" "+t+"<br />",t=r[0].expected[s].nominal.scheme===e[0].results[r[0].expected[s].row].nominal.scheme?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.scheme,i+="Nominal scheme: "+r[0].expected[s].nominal.scheme+" "+t+"<br />",t=r[0].expected[s].nominal.fund===e[0].results[r[0].expected[s].row].nominal.fund?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.fund,i+="Nominal fund: "+r[0].expected[s].nominal.fund+" "+t+"<br />",t=r[0].expected[s].nominal.fees_till_65_dollars===e[0].results[r[0].expected[s].row].nominal.fees_till_65_dollars?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.fees_till_65_dollars,i+="Nominal fees till 65 ($): "+r[0].expected[s].nominal.fees_till_65_dollars+" "+t+"<br />",t=r[0].expected[s].nominal.fees_till_65_percent===e[0].results[r[0].expected[s].row].nominal.fees_till_65_percent?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.fees_till_65_percent,i+="Nominal fees till 65 (%): "+r[0].expected[s].nominal.fees_till_65_percent+" "+t+"<br />",t=r[0].expected[s].nominal.active===e[0].results[r[0].expected[s].row].nominal.active?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span> != "+e[0].results[r[0].expected[s].row].nominal.active,i+="Nominal Passive/Active: "+r[0].expected[s].nominal.active+" "+t+"<br />",$("html").append(i+"<hr /></div>")},tests:[{month_born:1,year_born:1992,risk_profile:3,employment:!0,iac:!0,salary:95e3,employee_contrib:8,employer_contrib:4,earnings:"",contrib_freq:"",contrib:"",expected:[{row:1,todays:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:253850,fees_till_65_percent:11.3,active:"Active"},nominal:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:601620,fees_till_65_percent:8.8,active:"Active"}},{row:2,todays:{risk:"Medium risk",scheme:"AMP KiwiSaver Scheme",fund:"Balanced",fees_till_65_dollars:160320,fees_till_65_percent:12,active:"Active"},nominal:{risk:"Medium risk",scheme:"AMP KiwiSaver Scheme",fund:"Balanced",fees_till_65_dollars:370580,fees_till_65_percent:9.2,active:"Active"}},{row:3,todays:{risk:"Cash & Fixed Interest only",scheme:"AMP KiwiSaver Scheme",fund:"Cash",fees_till_65_dollars:66850,fees_till_65_percent:10.9,active:"Active"},nominal:{risk:"Cash & Fixed Interest only",scheme:"AMP KiwiSaver Scheme",fund:"Cash",fees_till_65_dollars:148220,fees_till_65_percent:8,active:"Active"}},{row:5,todays:{risk:"Low risk",scheme:"AMP KiwiSaver Scheme",fund:"Default (Default fund)",fees_till_65_dollars:67320,fees_till_65_percent:7.3,active:"Active"},nominal:{risk:"Low risk",scheme:"AMP KiwiSaver Scheme",fund:"Default (Default fund)",fees_till_65_dollars:152510,fees_till_65_percent:5.4,active:"Active"}},{row:8,todays:{risk:"Medium risk",scheme:"AMP KiwiSaver Scheme",fund:"Moderate Balanced",fees_till_65_dollars:160320,fees_till_65_percent:12,active:"Active"},nominal:{risk:"Medium risk",scheme:"AMP KiwiSaver Scheme",fund:"Moderate Balanced",fees_till_65_dollars:370580,fees_till_65_percent:9.2,active:"Active"}},{row:13,todays:{risk:"Medium to high risk",scheme:"ANZ KiwiSaver Scheme",fund:"Balanced Growth",fees_till_65_dollars:207510,fees_till_65_percent:12.7,active:"Active"},nominal:{risk:"Medium to high risk",scheme:"ANZ KiwiSaver Scheme",fund:"Balanced Growth",fees_till_65_dollars:484730,fees_till_65_percent:9.8,active:"Active"}},{row:35,todays:{risk:"Medium to high risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2045",fees_till_65_dollars:196630,fees_till_65_percent:11.9,active:"Active"},nominal:{risk:"Medium to high risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2045",fees_till_65_dollars:459240,fees_till_65_percent:9.1,active:"Active"}},{row:89,todays:{risk:"Cash & Fixed Interest only",scheme:"Grosvenor KiwiSaver Scheme",fund:"Enhanced Income",fees_till_65_dollars:74850,fees_till_65_percent:12.4,active:"Active"},nominal:{risk:"Cash & Fixed Interest only",scheme:"Grosvenor KiwiSaver Scheme",fund:"Enhanced Income",fees_till_65_dollars:165820,fees_till_65_percent:9,
active:"Active"}},{row:105,todays:{risk:"Medium to high risk",scheme:"Law Retirement KiwiSaver Scheme",fund:"Balanced Portfolio",fees_till_65_dollars:198630,fees_till_65_percent:12.1,active:"Active"},nominal:{risk:"Medium to high risk",scheme:"Law Retirement KiwiSaver Scheme",fund:"Balanced Portfolio",fees_till_65_dollars:463510,fees_till_65_percent:9.3,active:"Active"}}]},{month_born:1,year_born:1992,risk_profile:4,employment:!1,iac:!0,salary:"",employee_contrib:"",employer_contrib:"",earnings:3e4,contrib_freq:1,contrib:200,expected:[{row:1,todays:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:11730,fees_till_65_percent:15.5,active:"Active"},nominal:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:26810,fees_till_65_percent:11.6,active:"Active"}},{row:32,todays:{risk:"Low risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2015",fees_till_65_dollars:5690,fees_till_65_percent:22,active:"Active"},nominal:{risk:"Low risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2015",fees_till_65_dollars:11940,fees_till_65_percent:15.2,active:"Active"}},{row:200,todays:{risk:"Medium risk",scheme:"SuperLife",fund:"Ethica",fees_till_65_dollars:4580,fees_till_65_percent:9.3,active:"Passive"},nominal:{risk:"Medium risk",scheme:"SuperLife",fund:"Ethica",fees_till_65_dollars:9970,fees_till_65_percent:6.7,active:"Passive"}}]},{month_born:1,year_born:1982,risk_profile:2,employment:!0,iac:!0,salary:55e3,employee_contrib:8,employer_contrib:4,earnings:"",contrib_freq:"",contrib:"",expected:[{row:1,todays:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:74440,fees_till_65_percent:9.9,active:"Active"},nominal:{risk:"High risk",scheme:"AMP KiwiSaver Scheme",fund:"Aggressive",fees_till_65_dollars:143240,fees_till_65_percent:8,active:"Active"}},{row:32,todays:{risk:"Low risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2015",fees_till_65_dollars:36380,fees_till_65_percent:9.8,active:"Active"},nominal:{risk:"Low risk",scheme:"AonSaver Scheme",fund:"Russell LifePoints 2015",fees_till_65_dollars:67810,fees_till_65_percent:7.7,active:"Active"}},{row:200,todays:{risk:"Medium risk",scheme:"SuperLife",fund:"Ethica",fees_till_65_dollars:26850,fees_till_65_percent:4.9,active:"Passive"},nominal:{risk:"Medium risk",scheme:"SuperLife",fund:"Ethica",fees_till_65_dollars:50900,fees_till_65_percent:3.9,active:"Passive"}}]}]});