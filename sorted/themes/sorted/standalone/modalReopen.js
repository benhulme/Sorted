var reopen=function(o,n){console.log(o,n),console.log($(o)),$(o).modal("hide").on("hidden.bs.modal",function(){$(o).off("hidden.bs.modal"),console.log("hide"),$(n).modal("show")})};