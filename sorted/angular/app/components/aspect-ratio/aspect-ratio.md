# Aspect Ratio

The Aspect Ratio Directive is an easy to use tool which sets the dimensions of an object based on its width and a specified aspect ratio. The purpose of this directive is to allow ratio scaling on elements which are variable width but aren't sized by the content inside of it.

### Version
1.0.0

### Example

```
<div aspect-ratio="16:9">
    <p>If this div is 1600px wide, it will be 900px high</p>
</div>
```

### Notes

This directive must be passed the aspect ratio property on initialisation and it must be in the correct format of two integers seperated by a full colon.

