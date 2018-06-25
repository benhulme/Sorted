# Header

The Header Directive is designed specifically to manage the header sections of the website. There are two versions and the correct parameters need to be passed in for each.

### Version
1.0.0

### Example 

```
<div header="headerHome" class="layout-header"></div>
```

### Notes

The value passed into the header directive, in this case "headerHome" directly relates to the api-endpoint.constant value which the header populates its data using. The value headerHome will also prompt the directive to use a non standard template for the header as the home page has bespoke elements. Any other value will use the standard header template.

The class "layout-header" gives the header height so that when the content is loading in, the content below doesnt get pushed down the page. This can probably be removed when the preloader has been added.



