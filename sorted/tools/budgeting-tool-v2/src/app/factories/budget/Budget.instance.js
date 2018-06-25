'use strict';

function Budget(colourGenerator)
{
  var scope = this;
  scope.colourGenerator = colourGenerator;
};

/*@public
* The instance of this budget
* */
Budget.prototype.instance;

Budget.prototype.changeSinceSave = true;

/*@public
* Create  new budget

  @return self populated instance
* */
Budget.prototype.create = function(title)
{
  title = (title != undefined) ? title : '';

  this.instance = {
    Income : {
      Streams : [

      ],
      TotalCents : 0,
      Title: title
      // Period : ''
    },
  };

  return this.instance;
};

/*@public
* Update the period this budget is being worked out for

  @return self populated instance
* */
Budget.prototype.updateBudgetPeriod = function(period)
{
  this.instance.Income.Period = period;

  return this.instance;
};

/*@public
* Add a users income stream to the budget
*
* @param title:       String:  A name or title for this income
* @param cents:       Integer: The cents value of this income
* @param period:      Object:  Formatted Perioud object {shortname, title, per year}
* @param removeable:  Boolean: Can the user remove this from their overall income

  @return nothing
* */
Budget.prototype.addIncomeStream = function(title, cents, period, removeable)
{
  var formatCents = this.centsToValueFormattedString(cents);
  this.instance.Income.Streams.push({Title:title, Cents:cents, CentsFormattedString:formatCents, Period: period, Removable:removeable});

  var totalCents = 0;
  for(var i = 0; i < this.instance.Income.Streams.length; i++)
  {
    var cents = parseInt(this.instance.Income.Streams[i].Cents);
    totalCents += cents;
  }

  // Update the amount of cents value
  this.instance.Income.TotalCents = parseInt(totalCents);
  this.instance.Income.TotalFormattedString = this.centsToValueFormattedString(totalCents);
  this.instance.Income.Period = period;
};

/*@public
* Delete an income stream

  @return updated Income stream Array
* */
Budget.prototype.deleteIncomeStream = function(index)
{
  this.instance.Income.Streams.splice(index, 1);
  return this.instance.Income.Streams;
};

Budget.prototype.strDollarsToCents = function (str) {

  //remove commas and convert to cents
  var cents = parseFloat(str.replace(/,/g, '')) * 100;
  return cents;

};

Budget.prototype.guid = function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}



Budget.prototype.centsToValueFormattedString = function (valueInCents, round) {

  var t = parseFloat(Math.round((valueInCents/100) * 100) / 100).toFixed(2)

  if(round) {
    t = parseInt(Math.round(t));
  }

  //remove commas and convert to cents
  var valueFormattedString = t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return valueFormattedString;

};



/*@public
* Bulk add many Master and sub categories
*
* @param categories:  Array:  Formatted array

  @return nothing
* */
Budget.prototype.addInitialCategories = function(categories)
{
  this.instance.MasterCategories = categories;
};

/*@public
* Add a new Master Category to the Master Categories Array
*
* @param masterCategoryTitle:  String:  The title of the new Master Category

  @return the updated master categories
* */
Budget.prototype.addNewMasterCategory = function(masterCategoryTitle)
{

  var newMasterCategory = {
    ID: this.guid(),
    Title : masterCategoryTitle,
    // Icon : '/themes/sorted/standalone/tools/budget-calculator/assets/images/everyday_expenses.svg',
    Icon : '',
    Color: this.colourGenerator.getNextColour(),
    ValueCents : 0,
    ValueFormattedString : '$0',
    PieValuePercent : 0,
    DisplayOpen: false,
    SubCategories : []
  }

  this.instance.MasterCategories.push(newMasterCategory);

  return this.instance.MasterCategories;
};

/*@public
* Get all Master Categories data

  @return MasterCategories Array
* */
Budget.prototype.getCategories = function()
{
  return this.instance.MasterCategories;
};

/*@public
* Delete a specific sub category from a Master category

  @return updated MasterCategories Array
* */
Budget.prototype.deleteSubCategoryByIndex = function(masterCategoryIndex, subCategoryIndex)
{
  this.instance.MasterCategories[masterCategoryIndex]['SubCategories'].splice(subCategoryIndex, 1);

  this.calculateValues();

  return this.instance.MasterCategories;
};

/*@public
* Add a new sub category to the chosen master category
*
* @param masterCategoryIndex:  Integer:  The index of the master category
* @param masterCategoryId:     Integer:  The id of the master category
* @param title:                String:   The new sub category title

  @return the updated master's sub categories
* */
Budget.prototype.addNewSubCategoryToMasterCategory = function(
  masterCategoryIndex,
  masterCategoryId,
  title,
  valueInCents,
  period,
  imagePath
)
{
  var tempObj = angular.copy(this.instance);

  if(period === undefined) {
    period = tempObj['Income']['Period'];
  }

  if(valueInCents === undefined) {
    valueInCents = 0;
  }

  debugger;
  var valueFormattedString = this.centsToValueFormattedString(valueInCents);

  var subCategory = {
      ID: this.guid(),
      MasterCategoryID: masterCategoryId,
      Title : title,
      Image: imagePath,
      ValueCents : valueInCents,
      ValueFormattedString : valueFormattedString,
      Period : period
    };

  this.instance.MasterCategories[masterCategoryIndex].SubCategories.push(subCategory);


  this.calculateValues();

  return this.instance.MasterCategories[masterCategoryIndex].SubCategories;
};


Budget.prototype.updateSubCategoryByIndex = function(
  masterCategoryIndex,
  subCategoryIndex,
  title,
  valueInCents,
  period,
  imagePath
)
{

  debugger

  if(period === undefined) {
    period = tempObj['Income']['Period'];
  }

  if(valueInCents === undefined) {
    valueInCents = 0;
  }

  var valueFormattedString = this.centsToValueFormattedString(valueInCents);


  var cat = this.instance.MasterCategories[masterCategoryIndex]['SubCategories'][subCategoryIndex];
  cat.Title = title;
  cat.ValueCents = valueInCents;
  cat.Period = period;
  cat.ValueFormattedString =  valueFormattedString;
  cat.Image = imagePath;

  this.calculateValues();

  return this.instance.MasterCategories;
};



/*@public
* Update the preferred view type for the user in this budget
*
* @param view:        String:  either 'grid' or 'list' view currently available
*
  @return Nothing
* */
Budget.prototype.setBudgetView = function(view)
{
  this.instance.PreferredView = view;
};

/*@public
* Get the current view layout
*
  @return String
* */
Budget.prototype.getBudgetView = function()
{
  return this.instance.PreferredView
};

/*@public
* Parse the Budget object to in an expected format to
 * deliver for the upload

  @return Object
* */
Budget.prototype.parseForUpload = function()
{
  // Create a clone of the current budget instance
  var cloneObj = JSON.parse(JSON.stringify(this.instance));

  // Do some parse loop here

  // Return the parsed object
  return cloneObj;
};


Budget.prototype.deleteMasterCategotyByID = function (masterCategoryID) {

  var foundAt;
  for(var i = 0; i < this.instance.MasterCategories.length; i++)
  {
    if(this.instance.MasterCategories[i].ID === masterCategoryID) {
      foundAt = i;
    }
  }
  if (foundAt !== undefined) {
    this.instance.MasterCategories.splice(foundAt, 1);
  }

  this.calculateValues();

  return this.instance.MasterCategories;

};

Budget.prototype.updateMasterCategoryTitle = function (masterCategoryID, title) {

  var masterCat = this.getMasterCategoryById(masterCategoryID);

  if(masterCat) {
    masterCat.Title = title;
  }

  return this.instance.MasterCategories;

};

/**
 * Finds the master categot by id and returns it
 *
 *
 * @param masterCategoryID
 * @returns Object
 */
Budget.prototype.getMasterCategoryById = function (masterCategoryID) {

  var masterCategory;

  for(var i = 0; i < this.instance.MasterCategories.length; i++)
  {
    if(this.instance.MasterCategories[i].ID === masterCategoryID) {
      masterCategory = this.instance.MasterCategories[i];
    }
  }

  return masterCategory;

}


/*
* @Public
*
* Do the actual calculation
* Create a temporary Object and then update all the values within it.
* Then Update all the values in teh live model
*
* @return The budget Object
*
* */
Budget.prototype.calculateValues = function()
{
  var tempObj = angular.copy(this.instance);
  console.log(tempObj);

  var Income = tempObj['Income'];
  var IncomeStreams = Income['Streams'];
  var IncomeTotalCents = Income['TotalCents'];
  var IncomePeriod = Income['Period']['PerYear'];

  // console.log('IncomeTotalCents = ' + IncomeTotalCents);
  // console.log('Income = ' + Income);
  // console.log(Income);

  var cents;
  var incomeStreams_TotalCents = 0;
  var incomeStreamsTotal_FormattedString;

  for(var i = 0; i < IncomeStreams.length; i++)
  {
    var stream = IncomeStreams[i];
    cents = stream['Cents'];
    // console.log(cents);
    incomeStreams_TotalCents += cents;
  }
  incomeStreamsTotal_FormattedString = this.centsToValueFormattedString(incomeStreams_TotalCents);
  //incomeStreamsTotal_FormattedString = parseFloat(incomeStreams_TotalCents/100).toFixed(2).toString();


  var masterCategories_TotalCents = 0;
  var masterCategories_FormattedString;
  var masterCategories = tempObj['MasterCategories'];
  for(var i = 0; i < masterCategories.length; i++)
  {
    var masterCategory = masterCategories[i];
    // var masterCategoryTotalCents = masterCategory['ValueCents'];
    var masterCategoryTotalCents = 0;
    // console.log(masterCategory);
    for(var j = 0; j < masterCategory['SubCategories'].length; j++)
    {
      var subCategory = masterCategory['SubCategories'][j];
      cents = subCategory['ValueCents'];
      var period = subCategory['Period']['PerYear'];

      var totalCents = cents * period;
      var amountCents = totalCents / IncomePeriod;
      masterCategoryTotalCents += amountCents;
      // console.log(totalCents);
    }
    // masterCategory['ValueCents'] = masterCategoryTotalCents;
    // tempObj['MasterCategories'][i]['SubCategories'][j]
    // console.log(masterCategoryTotalCents);
    tempObj['MasterCategories'][i]['ValueCents'] = masterCategoryTotalCents;
    tempObj['MasterCategories'][i]['ValueFormattedString'] = '$' + this.centsToValueFormattedString(masterCategoryTotalCents, true);

    masterCategories_TotalCents += masterCategoryTotalCents;
  }

  masterCategories_FormattedString = parseFloat(masterCategories_TotalCents/100).toFixed(2).toString();

  // We know the total cents, let's find their percentage value
  for(var i = 0; i < tempObj['MasterCategories'].length; i++)
  {
    var thisCents = parseInt(tempObj['MasterCategories'][i]['ValueCents']);
    var dividedByTotal = parseFloat((thisCents / masterCategories_TotalCents) * 100).toFixed(0);
    tempObj['MasterCategories'][i]['PieValuePercent'] = dividedByTotal;
  }

  // Update the values in this model

  // Update the values for the Budget Total
  this.instance.Income.TotalCents = incomeStreams_TotalCents;
  this.instance.Income.TotalFormattedString = incomeStreamsTotal_FormattedString;

  this.instance.MasterCategoriesTotalCents = masterCategories_TotalCents;
  this.instance.MasterCategoriesTotalFormattedString = masterCategories_FormattedString;

  this.instance.Income.LeftToBudget = parseFloat((incomeStreams_TotalCents - masterCategories_TotalCents)/100).toFixed(2).toString();

  // Update the values in the Master Categories
  for(var i = 0; i < tempObj['MasterCategories'].length; i++)
  {
    this.instance.MasterCategories[i].ValueCents = tempObj['MasterCategories'][i]['ValueCents'];
    this.instance.MasterCategories[i].ValueFormattedString = tempObj['MasterCategories'][i]['ValueFormattedString'];
    this.instance.MasterCategories[i].PieValuePercent = (isNaN(tempObj['MasterCategories'][i]['PieValuePercent'])) ? 0 : tempObj['MasterCategories'][i]['PieValuePercent'];
  }

  this.instance.changeSinceSave = true;

  return this.instance;
};

//********* STATIC METHODS *********//
Budget.math = {

  convert : function (value, oldPeriod, newPeriod) {
    if (value.eq(0)) {
      return value;
    }
    return value.div(oldPeriod.PerYear).times(newPeriod.PerYear);
  },

  // If period is provided, display using its PerYear factor (otherwise, use Budget's)
  displayDollars : function (value, period) {
    if (typeof value === 'undefined') {
      return value;
    }
    if (value.eq(0)) {
      return value.toNumber();
    }

    var perYear = period ? period.PerYear : Budget.budget.Period.PerYear;
    return value
      .div(100)
      .div(perYear)
      .round(2)
      .toNumber();
  },

  // For main display inline editable amounts, don't divide by period
  displayCategoryDollars : function (value) {
    if (typeof value === 'undefined') {
      return value;
    }
    if (value.eq(0)) {
      return value.toNumber();
    }
    return value
      .div(100)
      .round(2)
      .toNumber();
  }
};
