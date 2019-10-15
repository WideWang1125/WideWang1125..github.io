var toTop=document.getElementById("toTop");
var tp=document.getElementById("tp");
	toTop.onmouseover=function(event){
		toTop.innerHTML="<br />顶部";
		tp.style.opacity="1.0";
	}
	toTop.onmouseout=function(event){
		toTop.innerHTML="<br />&uarr;";
		tp.style.opacity="0.8";
	}
	
	var value=document.getElementsByClassName("value");
	for (var i=0;i<value.length;i++) {
		value[i].onmouseover=function(event){
			this.bgColor="aliceblue";
		}
		value[i].onmouseout=function(event){
			this.bgColor="#fff";
		}
	}
