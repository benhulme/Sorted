/**
 * Created by stanislavk on 25/07/2016.
 */

$(document).ready(function(){



  var publicEvents = window.events;
  var template = Handlebars.compile($('#event').html())
  var eventLength = 0;
  var locationList = [];
  var topicList = [];
  var eventList = [];
  var timeList = [];
  var today = moment().endOf('day');
  var week = moment().endOf('week')
  var month = moment().endOf('month')
  var year = moment().endOf('year')




  Handlebars.registerHelper('iconUrl', function(eventTopic){
    switch(eventTopic){
      case 'Budgeting':
        return 'themes/sorted/assets/images/filters/filters-budgeting.svg'
      case 'Debt':
        return 'themes/sorted/assets/images/filters/filters-debt.svg'
      case 'Insurance':
        return 'themes/sorted/assets/images/filters/filters-protecting.svg'
      case 'Investing':
        return 'themes/sorted/assets/images/filters/filters-investments.svg'
      case 'Managing money':
        return 'themes/sorted/assets/images/filters/filters-budgeting.svg'
      case 'Mortgage':
        return 'themes/sorted/assets/images/filters/filters-home.svg'
      case 'Retirement & Kiwisaver':
        return 'themes/sorted/assets/images/filters/filters-kiwisaver.svg'
      case 'Savings':
        return 'themes/sorted/assets/images/filters/filters-investments.svg'
      case 'Wills':
        return 'themes/sorted/assets/images/filters/filters-protecting.svg'
      case "Women's wealth":
        return 'themes/sorted/assets/images/filters/filters-protecting.svg'
    }
  })



  var createLocation = function(arr){
    var temp = [];
    for(var i=0; i<arr.length; i++){
      temp.push(arr[i].City)
    }
    return _.uniq(temp)
  };

  var createTopic = function(arr){
    var temp = [];
    for(var i=0; i<arr.length; i++){
      temp.push(arr[i].Topic)
    }
    return _.uniq(temp)
  };

  var createEvent = function(arr){
    var temp = [];
    for(var i=0; i<arr.length; i++){
      temp.push(arr[i].EventType)
    }
    return _.uniq(temp)
  };

  var createTime = function(arr){
    var temp = [];
    for(var i=0; i<arr.length; i++){
      var day = moment(arr[i].StartDateTime)
      if(day<today){
        temp.push("Today")
      }
      if(day<week){
        temp.push("This week")
      }
      if(day<month){
        temp.push("This month")
      }
      if(day<year){
        temp.push("This year")
      }


    }
    return _.uniq(temp)
  };


  var updateFilter = function(arr){
    locationList = createLocation(arr);
    topicList = createTopic(arr);
    eventList = createEvent(arr);
    timeList = createTime(arr);
    location.empty().append(list(locationList))
    topic.empty().append(list(topicList))
    event.empty().append(list(eventList))
    time.empty().append(list(timeList))

  }


  var update = function(arr){
    $('.event-list').empty().append(template(arr))
  }

  var showMore = function(){
    var listEvent = $('.event');
    var button = $('.show-more');
    button.hide();
    eventLength+=10;
    listEvent.hide();
    listEvent.slice(0,eventLength).show();
    if(eventLength<listEvent.length){
      button.show();
    }
  }





  var location = $('#location-dropdown');
  var topic = $('#topic-dropdown');
  var event = $('#event-dropdown');
  var time = $('#time-dropdown');
  var list = Handlebars.compile($('#list').html())



  update(publicEvents);
  updateFilter(publicEvents)
  showMore();


  var Filter = function(data){
    this.data = data,
      this.filterCity  = function(val){
        if(val!=='any'){
          this.data = this.data.filter(function(item){
            if(item.City === val){
              return true
            } else {
              return false
            }
          })

        }
        return this
      },
      this.filterTopic = function(val){
        if(val !== 'any'){
          this.data = this.data.filter(function(item){
            if(item.Topic === val){
              return true
            } else {
              return false
            }
          })

        }
        return this
      },
      this.filterEvent = function(val){
        if(val !== 'any'){
          this.data = this.data.filter(function(item){
            if(item.EventType === val){
              return true
            } else {
              return false
            }
          })

        }
        return this
      },
      this.filterTime = function(val){
        if(val !== 'any'){
          this.data = this.data.filter(function(item){
            var day = moment(item.StartDateTime);
            var temp;

            switch(val){
              case 'Today':
                temp = today
                break;


              case 'This week':
                temp = week
                break;


              case 'This month':
                temp = month
                break;


              case 'This year':
                temp = year
                break;

            }
            if(day<temp){
              return true
            }else {
              return false
            }
          })
        }
      }

  };

  var filter = function(e){
    e.preventDefault();
    var fil = new Filter(publicEvents);
    var currentLocation = location[0].value;
    var currentTopic = topic[0].value;
    var currentEvent = event[0].value;
    var currentTime = time[0].value;
    eventLength = 0;
    showMore();

    fil.filterTopic(currentTopic).filterCity(currentLocation).filterEvent(currentEvent).filterTime(currentTime)
    updateFilter(fil.data);

    location.val(currentLocation);
    topic.val(currentTopic);
    event.val(currentEvent);
    time.val(currentTime);

    update(fil.data)

  }




  $('.show-more').on('click', function(event){
    event.preventDefault();
    showMore();
  })


  $('#reset').on('click', function(event){
    event.preventDefault();
    update(publicEvents);
    updateFilter(publicEvents)
  })


  $('.dropdown select').each(function(){
    $(this).on('change', filter)
  });




})
