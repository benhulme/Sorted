$(document).ready(function(){var e=window.events,t=Handlebars.compile($("#event").html()),s=0,n=[],i=[],r=[],a=[],o=moment().endOf("day"),l=moment().endOf("week"),u=moment().endOf("month"),f=moment().endOf("year");Handlebars.registerHelper("iconUrl",function(e){switch(e){case"Budgeting":return"themes/sorted/assets/images/filters/filters-budgeting.svg";case"Debt":return"themes/sorted/assets/images/filters/filters-debt.svg";case"Insurance":return"themes/sorted/assets/images/filters/filters-protecting.svg";case"Investing":return"themes/sorted/assets/images/filters/filters-investments.svg";case"Managing money":return"themes/sorted/assets/images/filters/filters-budgeting.svg";case"Mortgage":return"themes/sorted/assets/images/filters/filters-home.svg";case"Retirement & Kiwisaver":return"themes/sorted/assets/images/filters/filters-kiwisaver.svg";case"Savings":return"themes/sorted/assets/images/filters/filters-investments.svg";case"Wills":return"themes/sorted/assets/images/filters/filters-protecting.svg";case"Women's wealth":return"themes/sorted/assets/images/filters/filters-protecting.svg"}});var h=function(e){for(var t=[],s=0;s<e.length;s++)t.push(e[s].City);return _.uniq(t)},c=function(e){for(var t=[],s=0;s<e.length;s++)t.push(e[s].Topic);return _.uniq(t)},m=function(e){for(var t=[],s=0;s<e.length;s++)t.push(e[s].EventType);return _.uniq(t)},d=function(e){for(var t=[],s=0;s<e.length;s++){var n=moment(e[s].StartDateTime);n<o&&t.push("Today"),n<l&&t.push("This week"),n<u&&t.push("This month"),n<f&&t.push("This year")}return _.uniq(t)},v=function(e){n=h(e),i=c(e),r=m(e),a=d(e),y.empty().append(k(n)),w.empty().append(k(i)),T.empty().append(k(r)),b.empty().append(k(a))},p=function(e){$(".event-list").empty().append(t(e))},g=function(){var e=$(".event"),t=$(".show-more");t.hide(),s+=10,e.hide(),e.slice(0,s).show(),s<e.length&&t.show()},y=$("#location-dropdown"),w=$("#topic-dropdown"),T=$("#event-dropdown"),b=$("#time-dropdown"),k=Handlebars.compile($("#list").html());p(e),v(e),g();var D=function(e){this.data=e,this.filterCity=function(e){return"any"!==e&&(this.data=this.data.filter(function(t){return t.City===e})),this},this.filterTopic=function(e){return"any"!==e&&(this.data=this.data.filter(function(t){return t.Topic===e})),this},this.filterEvent=function(e){return"any"!==e&&(this.data=this.data.filter(function(t){return t.EventType===e})),this},this.filterTime=function(e){"any"!==e&&(this.data=this.data.filter(function(t){var s,n=moment(t.StartDateTime);switch(e){case"Today":s=o;break;case"This week":s=l;break;case"This month":s=u;break;case"This year":s=f}return n<s}))}},q=function(t){t.preventDefault();var n=new D(e),i=y[0].value,r=w[0].value,a=T[0].value,o=b[0].value;s=0,g(),n.filterTopic(r).filterCity(i).filterEvent(a).filterTime(o),v(n.data),y.val(i),w.val(r),T.val(a),b.val(o),p(n.data)};$(".show-more").on("click",function(e){e.preventDefault(),g()}),$("#reset").on("click",function(t){t.preventDefault(),p(e),v(e)}),$(".dropdown select").each(function(){$(this).on("change",q)})});