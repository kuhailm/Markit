
/* this module is used to format numbers */
var numberFormat=(
    function(){
    //privates
    var suffixes=['','K','M','B','T']; //suffixes for numbers: K=Kilo, M=Million, B=Billion, T=Trillion
    return{
        format: function(number,precision){
            var sign=number<0?"-":""; //whether the number is positive or negative
            number=Math.abs(number);
            var suffix_index=0;
            var suffix_length=suffixes.length;
            while(number>=1000 && suffix_index<suffix_length-1){
                number=number/1000;
                ++suffix_index;
            }
            return sign+number.toFixed(precision)+suffixes[suffix_index];
    }
    }}());

function htmlMaker(html){ //this class is used to generate dynamic HTML
 this.html=html; 
}

htmlMaker.prototype.getHTML=function(values){
    for (var key in values) {
        this.html=this.html.replace("{{"+key+"}}",values[key]);
    }
    return this.html;   
};

htmlMaker.prototype.replace_Block=function(block_name,values){
    var block_start_text="{{#block "+ block_name+"}}";
    var block_end_text="{{#end block "+ block_name+"}}";
    var start_index=this.html.search(block_start_text)+block_start_text.length;
    var end_index=this.html.search(block_end_text);
    var block = this.html.substring(start_index,end_index);
    this.html=this.html.substring(0,start_index)+this.html.substring(end_index,this.html.length-1);
    if(block.length>0){
        var block_html="";
        var blocks="";
    
                for(var i=0;i<values.length;++i){
                    block_html=block;
                    for (var key in values[i]) {
                        block_html=block_html.replace("{{"+key+"}}",values[i][key]);
                    }
                    blocks+=block_html;
                }
                this.html=this.html.replace(block_start_text,blocks);
                this.html=this.html.replace(block_end_text,"");
            }
           return this.html;   
};


function is_today(dateString){
   var date=parseDate(dateString);
   var now=new Date();
   return date.getFullYear()==now.getFullYear() && date.getMonth()==now.getMonth() && date.getDate() && now.getDate();
}

function parseDate(dateString){
    var date=new Date(dateString); //works for Chrome
    if(isNaN(date.getTime()))
        date=new Date(dateString.replace(' ','T')); //works for Firefox, IE
    return date;
}



