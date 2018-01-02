export class Helper{

    getDateFormat(count = 0){
        var dateOffset = (24*60*60*1000) * count;
        var date = new Date();
        date.setTime(date.getTime() - dateOffset);
        var dd = date.getDate();
        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        var dd1 = dd.toString();
        var mm1 = mm.toString();
        if(dd<10) 
        { 
          dd1 = '0' + dd.toString();
        } 
    
        if(mm<10) 
        {
          mm1 = '0' + mm.toString();;
        } 
        var newDate = yyyy + '-' + mm1 + '-' + dd1;
        return newDate;
    }

}