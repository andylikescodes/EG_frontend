//order employees in the desired order
function compare_status(a,b){
    var status_order = ["online", "idle", "dnd", "offline"] 
    //put them as ordered so the one with bigger index is smaller
    //this will save us a lot of 'if'
    if(status_order.indexOf(a.status)<status_order.indexOf(b.status)) return -1
    else return 1
}

function default_compare(a,b){
    //if status not equal, then compare status
    if (a.status && b.status && a.status!=b.status) return compare_status(a,b)
    //if one doesn't has status (means DC not binded), the one has status win
    else if (a.status && !b.status) return -1
    else if (!a.status && b.status) return 1
    //here it can only be a.status==b.status or both doesn't have status attribute
    //in this case, compare popularity
    else if (a.popularity>b.popularity) return -1;
    else return 1
}

function rank_employees(employee_list,  config){
    if (!config || config == "default"){
        //rank in a default way
        var compare = default_compare
    }
    employee_list.sort(compare)
}

function combine_status(list, status){
    status.forEach(x=>{
        for(let i = 0; i<list.length; i++){
          let member = list[i]
          if (member.username==x.username){
            member.status=x.status
          }
        }
      })
}

function rank_employees_with_status(employee_list, status_list){
    combine_status(employee_list, status_list)
    rank_employees(employee_list)
}
//def order_list(list, config) // order list by attribute
export {
    rank_employees,
    combine_status,
    rank_employees_with_status
}