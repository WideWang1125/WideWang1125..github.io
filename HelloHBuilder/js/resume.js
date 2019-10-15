var toTop=document.getElementById("toTop");
	toTop.onmouseover=function(event){
		toTop.innerHTML="<br />顶部";
		toTop.style.opacity="1.0";
	}
	toTop.onmouseout=function(event){
		toTop.innerHTML="<br />&uarr;";
		toTop.style.opacity="0.8";
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