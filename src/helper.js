export function get_pages_array(total_pages = 10, current_pages = 1, required_pages = 5){
    let temp = required_pages
    if (total_pages >= required_pages){
        const fa = []

        // get the first half of the array
        for (let i = Math.ceil(required_pages / 2) - 1; i > 0; i--){
            if (current_pages - i > 0){
                temp -= 1
                fa.push(current_pages - i)
            }
        }

        // get the second half of the array
        let temp2 = temp
        for (let i = 0; i < temp2; i++){
            if (current_pages + i && current_pages + i <= total_pages){
                fa.push(current_pages + i)
                temp -= 1
            }
        }

        // if the required pages is more than the total pages, then add the remaining pages to the array
        if (temp > 0){
            for (let i=0; i < required_pages; i++){
                console.log("index = ",i)
                if (!fa.includes(current_pages - i) && temp > 0){
                    fa.push(current_pages - i)
                    temp -= 1
                }
            }
        }
        
        return fa.sort(function(a, b){return a - b});
    }else{
        return Array.from({ length: total_pages }, (_, index) => index + 1)
    }
}