var stock=(
    function(){
        function display_stock(data){
             $.get('templates/stock.html', function(html){
                 var tmpl_maker=new htmlMaker(html);
                 var change=isNaN(data.Change)?"":data.Change.toFixed(2);
                 var change_class=isNaN(data.Change) || data.Change==0?"":data.Change>0?"positive_change":"negative_change";
                 var change_percent=isNaN(data.ChangePercent)?"":data.ChangePercent.toFixed(2)+"%";
                 var format_date=is_today(data.Timestamp)?"hh:mm a":"dd/mm/yyyy";
                 var date=$.format.date(new Date(data.Timestamp), format_date);
                 var high=numberFormat.format(data.High,2);
                 var low=numberFormat.format(data.Low,2);
                 var open=numberFormat.format(data.Open,2);
                 var volume=numberFormat.format(data.Volume,1);
                 var market_Cap=numberFormat.format(data.MarketCap,1);
                 
                 var values={"name":data.Name, "last_price":data.LastPrice,"change":change,
                            "change_percent":change_percent,"change_class":change_class,"date":date};
                 var item_values=[];
                 item_values.push({"item":"Range","value":low+" - "+high});
                 item_values.push({"item":"Open","value":open});
                 item_values.push({"item":"Volume","value":volume});
                 item_values.push({"item":"Market Cap","value":market_Cap});
                 html=tmpl_maker.getHTML(values);
                 html=tmpl_maker.replace_Block("items",item_values);
                 $('#quote-module').html(html);
             });
         }
         return{
             show_stock: function(symbol){
                 $.ajax({
                     dataType:'jsonp',
                     url:'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol,
                     success:function(data) {
                         display_stock(data);
                    }
                });
            }
    }}
());


stock.show_stock("MSFT");

$(document).ready(function(){
    $("#quote_button").click(function(){
        var txt_value=$("#quote_text").val();
        if(txt_value.trim()!="" && txt_value!=null)
            stock.show_stock(txt_value);
    });
});

