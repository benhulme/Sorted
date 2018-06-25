FORMAT: 1A
HOST: http://sorted.digitalstaging.co.nz/

# Sorted

This document is reference for Sorted website API.

# Sorted API root [/]


# Profile API [/api/{api_version}/profile]

## Get current Profile [/api/{api_version}/profile/get]

### Get Profile [GET]

+ Response 200 (application/json)

        {
           "FirstName":"Billy",
           "Surname":"Xoo",
           "Email":"admin",
           "MobilePhone":"123",
           "BirthDate":"1960-03-17",
           "Subscription":"0",
           "ID":1
        }
        
## Create new Profile [/api/{api_version}/profile/save]

### Save Profile [POST]
+ Request (application/json)
        
    + Headers
    
            X-Csrf-Token: a9cc7b33e21e75f8d426905bd1ff6b01

    + Body
        
            {
               "FirstName":"Billy",
               "Surname":"Xoo",
               "Email":"admin",
               "MobilePhone":"123",
               "BirthDate":"1960-03-17",
               "Subscription":"0",
               "Password" : "123456"
            }
        
+ Response 201 (application/json)
        
        {
            "Status":"Success",
            "Message":"Profile created"
        }
        
+ Response 401 (application/json)

        {
            "status":"error",
            "message":"CSRF token mismatch"
        }
        
## Update Profile [/api/{api_version}/profile/update]

### Update current user Profile [PUT]
    
+ Request (application/json)
        
    + Headers
    
            X-Csrf-Token: a9cc7b33e21e75f8d426905bd1ff6b01
        
    + Body
        
            {
                "FirstName":"John",
                "Email":"John@example.com",
                "Surname":"Doe"
            }
                
    
+ Response 200 (application/json)
        
        
        {
            "Status":"Success",
            "Message":"Profile updated"
        }
        
    
+ Response 401 (application/json)

        
        {
            "Status":"error",
            "Message":"CSRF token mismatch"
        }
        

## Remove Profile [/api/{api_version}/profile/delete]

### Delete current profile [DELETE]

+ Response 202 (application/json)


        {
            "Status":"Success",
            "Message":"Profile deleted"
        }

## Upload Profile Image [/api/{api_version}/profile/upload]

### Update current user Profile Image [POST]
    
+ Request (multipart/form-data; boundary=----WebKitFormBoundarykzhSgAp70LfhMANt)
        
    + Headers
    
            X-Csrf-Token: 'a9cc7b33e21e75f8d426905bd1ff6b01'
        
    + Body
        
            ----WebKitFormBoundarykzhSgAp70LfhMANt
                Content-Disposition: form-data; name="Image"; filename="userpic.jpg"
                Content-Type: image/jpg
            ----WebKitFormBoundarykzhSgAp70LfhMANt
                
    
+ Response 200 (application/json)
        
        {
            "Status":"Success"
        }
        
    
+ Response 401 (application/json)

        
        {
            "Status":"error",
            "Message":"CSRF token mismatch"
        }
        
+ Response 406 (application/json)

        
        {
            "Status":"error",
            "Message":"No image in request"
        }

+ Response 500 (application/json)

        
        {
            "Status":"error",
            "Message":"Extension is not allowed (valid: jpg, png, gif)"
        }
                        
# Campaign API [/api/{api_version}/campaign]

## List All Campaigns [/api/{api_version}/campaign/query]

### Query all Campaigns [GET]

+ Response 200 (application/json)

            [
               {
                  "ClassName":"CampaignPage",
                  "LastEdited":"2015-12-09 03:03:06",
                  "Created":"2015-12-09 02:59:38",
                  "URLSegment":"new-campaign-page",
                  "Title":"New Campaign Page",
                  "Content":"<p>sdf sdf s<\/p>",
                  "ShowInMenus":"1",
                  "ShowInSearch":"1",
                  "Sort":"1",
                  "HasBrokenFile":"0",
                  "HasBrokenLink":"0",
                  "CanViewType":"Inherit",
                  "CanEditType":"Inherit",
                  "Version":"4",
                  "ParentID":"1",
                  "ShortCopy":"sdfsdf ",
                  "ButtonCopy":"sdf sdf ",
                  "ThumbnailID":"3",
                  "BladeImageID":"2",
                  "ID":10,
                  "RecordClassName":"CampaignPage",
                  "parser":{},
                  "Thumbnail":{
                     "ClassName":"Image",
                     "LastEdited":"2015-12-09 03:01:45",
                     "Created":"2015-12-09 03:01:45",
                     "Name":"1464698-811943668880595-2507323616136066882-n.jpeg",
                     "Title":"1464698 811943668880595 2507323616136066882 n",
                     "Filename":"assets\/Uploads\/1464698-811943668880595-2507323616136066882-n.jpeg",
                     "ShowInSearch":"1",
                     "ParentID":"1",
                     "OwnerID":"1",
                     "ID":3,
                     "RecordClassName":"Image"
                  },
                  "BladeImage":{
                     "ClassName":"Image",
                     "LastEdited":"2015-12-09 03:01:41",
                     "Created":"2015-12-09 03:01:41",
                     "Name":"f56ii9uf.png",
                     "Title":"f56ii9uf",
                     "Filename":"assets\/Uploads\/f56ii9uf.png",
                     "ShowInSearch":"1",
                     "ParentID":"1",
                     "OwnerID":"1",
                     "ID":2,
                     "RecordClassName":"Image"
                  }
               }
            ]       

# Blog API [/api/{api_version}/blog]

## Get posts [/api/{api_version}/blog/get]

### Get last 6 posts [GET|POST|PUT|DELETE]

+ Response 200 (application/json)
        
        [
           {
              "_SortColumn0":"0",
              "ClassName":"SortedBlogPost",
              "LastEdited":"2016-01-14 02:04:48",
              "Created":"2016-01-14 02:04:33",
              "URLSegment":"sorted-blog-post-by-john",
              "Title":"Sorted Blog Post by john",
              "Content":"<p><span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur<\/span><\/p>",
              "ShowInMenus":"0",
              "ShowInSearch":"1",
              "Sort":"4",
              "HasBrokenFile":"0",
              "HasBrokenLink":"0",
              "CanViewType":"Inherit",
              "CanEditType":"Inherit",
              "Version":"3",
              "ParentID":"9",
              "PublishDate":"2016-01-14 02:04:48",
              "FeaturedImageID":"0",
              "IsVideoPost":"0",
              "ThumbImageID":"0",
              "ID":13,
              "RecordClassName":"SortedBlogPost",
              "parser":{
        
              },
              "ThumbImage":{
                 "ID":0,
                 "ClassName":"Image",
                 "RecordClassName":"Image",
                 "ShowInSearch":1
              },
              "Author":{
                 "FirstName":"John",
                 "Surname":"Doe",
                 "Email":"user@example.com",
                 "ID":2
              }
           },
           {
              "_SortColumn0":"0",
              "ClassName":"SortedBlogPost",
              "LastEdited":"2016-01-14 02:00:50",
              "Created":"2016-01-14 02:00:17",
              "URLSegment":"sorted-blog-post-3",
              "Title":"Sorted Blog Post 3",
              "ShowInMenus":"0",
              "ShowInSearch":"1",
              "Sort":"3",
              "HasBrokenFile":"0",
              "HasBrokenLink":"0",
              "CanViewType":"Inherit",
              "CanEditType":"Inherit",
              "Version":"3",
              "ParentID":"9",
              "PublishDate":"2016-01-14 02:00:50",
              "FeaturedImageID":"3",
              "IsVideoPost":"1",
              "ThumbImageID":"0",
              "ID":12,
              "RecordClassName":"SortedBlogPost",
              "parser":{},
              "ThumbImage":{
                 "ID":0,
                 "ClassName":"Image",
                 "RecordClassName":"Image",
                 "ShowInSearch":1
              },
              "Author":{
                 "FirstName":"Default Admin",
                 "Email":"admin",
                 "ID":1
              }
           },
           {
              "_SortColumn0":"0",
              "ClassName":"SortedBlogPost",
              "LastEdited":"2016-01-14 02:00:06",
              "Created":"2016-01-14 01:59:48",
              "URLSegment":"sorted-blog-post-2",
              "Title":"Sorted Blog Post 2",
              "Content":"<p><span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur<\/span><\/p>",
              "ShowInMenus":"0",
              "ShowInSearch":"1",
              "Sort":"2",
              "HasBrokenFile":"0",
              "HasBrokenLink":"0",
              "CanViewType":"Inherit",
              "CanEditType":"Inherit",
              "Version":"3",
              "ParentID":"9",
              "PublishDate":"2016-01-14 02:00:06",
              "FeaturedImageID":"0",
              "IsVideoPost":"0",
              "ThumbImageID":"2",
              "ID":11,
              "RecordClassName":"SortedBlogPost",
              "parser":{},
              "ThumbImage":{
                 "ClassName":"Image",
                 "LastEdited":"2016-01-14 01:52:04",
                 "Created":"2016-01-14 01:52:04",
                 "Name":"certificates.jpg",
                 "Title":"certificates",
                 "Filename":"assets\/Uploads\/certificates.jpg",
                 "ShowInSearch":"1",
                 "ParentID":"1",
                 "OwnerID":"1",
                 "ID":2,
                 "RecordClassName":"Image"
              },
              "Author":{
                 "FirstName":"Default Admin",
                 "Email":"admin",
                 "ID":1
              }
           },
           {
              "_SortColumn0":"0",
              "ClassName":"SortedBlogPost",
              "LastEdited":"2016-01-14 01:59:41",
              "Created":"2016-01-14 01:59:25",
              "URLSegment":"new-sorted-blog-post-1",
              "Title":"New Sorted Blog Post 1",
              "Content":"<p><span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur<\/span><\/p>",
              "ShowInMenus":"0",
              "ShowInSearch":"1",
              "Sort":"1",
              "HasBrokenFile":"0",
              "HasBrokenLink":"0",
              "CanViewType":"Inherit",
              "CanEditType":"Inherit",
              "Version":"3",
              "ParentID":"9",
              "PublishDate":"2016-01-14 01:59:41",
              "FeaturedImageID":"0",
              "IsVideoPost":"0",
              "ThumbImageID":"0",
              "ID":10,
              "RecordClassName":"SortedBlogPost",
              "parser":{},
              "ThumbImage":{
                 "ID":0,
                 "ClassName":"Image",
                 "RecordClassName":"Image",
                 "ShowInSearch":1
              },
              "Author":{
                 "FirstName":"Default Admin",
                 "Email":"admin",
                 "ID":1
              }
           }
        ]
        

# Calculator API [/api/{api_version}/calculator/{action}/{ID}]

## Get data for calculator by calcID [/api/{api_version}/calculator/get/{ID}]

### Get data [GET]

+ Response 200 (application/json)

        {
            ClassName: "CalcData",
            LastEdited: "2016-02-05 01:21:54",
            Created: "2016-02-05 01:21:54",
            Data: "{ "mooo": "aaaaBBBBZZZZZ", "fooo":012345 }",
            CalcID: "1",
            MemberID: "2",
            ID: 2,
            RecordClassName: "CalcData"
        }
        
+ Response 404 (application/json)

        {
            status: "error",
            message: "Data not found"
        }

+ Response 500 (text/html)
        
        + Body:
            "User not logged in or not found"

## Query data [/api/{api_version}/calculator/query]

### Query data [GET]

+ Response 200 (application/json)

        [
            {
                ClassName: "CalcData",
                LastEdited: "2016-02-05 01:21:53",
                Created: "2016-02-05 01:21:53",
                Data: "{ "mooo": "aaaaBBBBZZZZZ", "fooo":012345 }",
                CalcID: "1",
                MemberID: "2",
                ID: 1,
                RecordClassName: "CalcData"
            },
            {
                ClassName: "CalcData",
                LastEdited: "2016-02-05 01:21:54",
                Created: "2016-02-05 01:21:54",
                Data: "{ "mooo": "aaaaBBBBZZZZZ", "fooo":012345 }",
                CalcID: "1",
                MemberID: "2",
                ID: 2,
                RecordClassName: "CalcData"
            }
        ]   

+ Response 500 (text/html)
        
        + Body:
            "User not logged in or not found"


## Save data for calc [/api/{api_version}/calculator/save/{ID}]

### Save data [POST]

+ Request (application/json)
        
    + Headers
    
            X-Csrf-Token: 'a9cc7b33e21e75f8d426905bd1ff6b01'
        
    + Body
    
            {
                "Data": "{ \"mooo\": \"aaaaBBBBZZZZZ\", \"fooo\":012345 }",
                "CalcID": 1
            }

+ Response 200 (application/json)

            {
                "status": "success"
            }


+ Response 405 (application/json)

        + Body:
            "Method not allowed"

+ Response 500 (text/html)
        
        + Body:
            "User not logged in or not found"

+ Response 401 (application/json)

        + Body:
            "CSRF token mismatch"
            
## Update data for calc [/api/{api_version}/calculator/update/{ID}]

### Update data [PUT]

+ Request (application/json)
        
    + Headers
    
            X-Csrf-Token: 'a9cc7b33e21e75f8d426905bd1ff6b01'
        
    + Body
    
            {
                "Data": "{ \"mooo\": \"aaaaBBBBZZZZZ\", \"fooo\":012345 }",
                "CalcID": 1
            }

+ Response 200 (application/json)

            {
                "status": "success"
            }

+ Response 405 (application/json)

    + Body
    
            "Method not allowed"

+ Response 500 (text/html)
        
    + Body
    
            "User not logged in or not found"

+ Response 401 (application/json)

    + Body
    
            "CSRF token mismatch"
            
## Delete data [/api/{api_version}/calculator/delete/{ID}]

### Delete data [DELETE]

+ Request (application/json)
        
    + Headers
    
            X-Csrf-Token: 'a9cc7b33e21e75f8d426905bd1ff6b01'

+ Response 200 (application/json)

            {
                "status": "success"
            }

+ Response 404 (application/json)
            
            {
                "status": "error",
                "message": "Wrong ID"
            }
            
+ Response 401 (application/json)

            {
                status: "error",
                message: "CSRF token mismatch"
            }
            
# Collector API [/api/{api_version}/collector]

## Add Email [/api/{api_version}/collector/email]

### Add Email [POST]

+ Request (application/json)
    
    + Body
        
            {
               "email":"John.Doe@example.com"
            }
        
+ Response 201 (application/json)
        
        {
            "Status":"Success"
        }
        