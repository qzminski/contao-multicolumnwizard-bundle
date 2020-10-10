var MultiColumnWizard=new Class({Implements:[Options],options:{table:null,maxCount:0,minCount:0,uniqueFields:[]},asyncBlock:!1,operationLoadCallbacks:[],operationClickCallbacks:[],operationUpdateCallbacks:[],initialize:function(t){this.setOptions(t),this.options.table=document.id(this.options.table),window.Backend&&Backend.getScrollOffset(),this.updateOperations()},updateOperations:function(){let t=this;this.options.table.getElement("tbody").getChildren("tr").each((function(e,a){e.getChildren("td.operations a").each((function(a){let n=a.get("data-operations");a.removeEvents("click"),"move"===n&&t.dragAndDrop(e,a),MultiColumnWizard.operationClickCallbacks[n]&&MultiColumnWizard.operationClickCallbacks[n].each((function(n){a.addEvent("click",(function(i){i.preventDefault(),n.pass([a,e],t)()}))})),MultiColumnWizard.operationClickCallbacks[n]&&MultiColumnWizard.operationClickCallbacks[n].each((function(n){a.addEvent("click",(function(i){i.preventDefault(),n.pass([a,e],t)()}))})),a.addEvent("click",(function(n){n.preventDefault(),t.updateOperations.pass([a,e],t)()})),MultiColumnWizard.operationUpdateCallbacks[n]&&MultiColumnWizard.operationUpdateCallbacks[n].each((function(n){n.pass([a,e],t)()})),MultiColumnWizard.operationUpdateCallbacks[n]&&MultiColumnWizard.operationUpdateCallbacks[n].each((function(n){n.pass([a,e],t)()}))}))}))},updateRowAttributes:function(t,e){var a=!0,n=0,i=0,l=0,o=0;return e.getElements(".mcwUpdateFields *").each((function(e){if(e.hasClass("tl_modulewizard")&&e.hasClass("multicolumnwizard")&&(a=!1,n++,e.addClass("mcw_inner_"+n),l=e.getElement("tbody").getElement("tr").getElements("td.mcwUpdateFields").length,o=1),0===n||e.hasClass("tl_modulewizard")&&e.hasClass("multicolumnwizard")||null!==e.getParent(".mcw_inner_"+n)||0===--n&&(a=!0),e.hasClass("chzn-container"))e.destroy();else{if("string"==typeOf(e.getProperty("name"))){var r=e.getProperty("name"),s=r.match(/([^[\]]+)/g),c=null,d="";s.each((function(t,e){!isNaN(parseFloat(t))&&isFinite(t)&&(c=e)})),s.each((function(e,n){0===n?d+=e:n===c&&a?d+="["+t+"]":n!==c-2||a?n!==c||a?d+="["+e+"]":(d+="["+i+"]",i=o>0&&o%l==0?++i:i,o++):d+="["+t+"]"})),"[]"==r.substr(r.length-2)&&(d+="[]"),e.setProperty("name",d)}var u;if("string"==typeOf(e.getProperty("id")))(u=e.getProperty("id").match(/^(.+)_row[0-9]+_(.+)$/i))&&e.setProperty("id",u[1]+"_row"+t+"_"+u[2]);if("string"==typeOf(e.getProperty("onclick")))(u=e.getProperty("onclick").match(/^(.+)_row[0-9]+_(.+)$/i))&&e.setProperty("onclick",u[1]+"_row"+t+"_"+u[2]);if("string"==typeOf(e.getProperty("for")))(u=e.getProperty("for").match(/^(.+)_row[0-9]+_(.+)$/i))&&e.setProperty("for",u[1]+"_row"+t+"_"+u[2]);switch(e.nodeName.toUpperCase()){case"SELECT":e.hasClass("tl_chosen")&&new Chosen(e);break;case"INPUT":"none"==e.getStyle("display").toLowerCase()&&e.setStyle("display","inline"),"string"!=typeOf(e.getProperty("id"))&&e.destroy();break;case"SCRIPT":for(var p="",m=e.get("html").toString(),C=0,h=m.search(/_row[0-9]+_/i);h>0;)C=m.match(/(_row[0-9]+)+_/i)[0].length,p=p+m.substr(0,h)+"_row"+t+"_",h=(m=m.substr(h+C)).search(/_row[0-9]+_/i);e.set("html",p+m)}}})),e},dragAndDrop:function(t,e){new Sortables(t.getParent("table").getElement("tbody"),{constrain:!0,opacity:.6,handle:"a[data-operations=move]",onComplete:function(){t.getParent("table").getElement("tbody").getChildren("tr").each((function(t,e){var a=e--;this.updateRowAttributes(a,t)}),this)}.bind(this)})},addOperationLoadCallback:function(t,e){this.operationLoadCallbacks[t]||(this.operationLoadCallbacks[t]=[]),this.operationLoadCallbacks[t].include(e)},addOperationUpdateCallback:function(t,e){this.operationUpdateCallbacks[t]||(this.operationUpdateCallbacks[t]=[]),this.operationUpdateCallbacks[t].include(e)},addOperationClickCallback:function(t,e){this.operationClickCallbacks[t]||(this.operationClickCallbacks[t]=[]),this.operationClickCallbacks[t].include(e)},killAllTinyMCE:function(t,e){var a=e.getParent(".multicolumnwizard");if(0!=a.getElements(".tinymce").length){var n=a.get("id"),i=new RegExp(n),l=new Array,o=0,r="editorId";tinymce.majorVersion>3&&(r="id"),tinymce.editors.each((function(t,e){null!=t[r].match(i)&&(l[o]=t[r],o++)})),l.each((function(t,e){try{var a=tinymce.get(t);$(a[r]).set("text",a.getContent()),a.remove()}catch(t){console.log(t)}})),a.getElements("span.mceEditor").each((function(t,e){t.dispose()})),a.getElements(".tinymce").each((function(t,e){t.getElements("script").each((function(t,e){t.dispose()}))}))}},reinitTinyMCE:function(t,e,a){var n=null;if(0!=(n=1!=a?e.getParent(".multicolumnwizard"):e).getElements(".tinymce").length){var i=n.getElements(".tinymce textarea"),l="mceAddControl";tinymce.majorVersion>3&&(l="mceAddEditor"),i.each((function(t,e){tinymce.execCommand(l,!1,t.get("id")),tinymce.get(t.get("id")).show(),$(t.get("id")).erase("required"),$(tinymce.get(t.get("id")).editorContainer).getElements("iframe")[0].set("title","MultiColumnWizard - TinyMCE")}))}},reinitStylect:function(){window.Stylect&&versionCompare("3.2.3")>=0&&($$(".styled_select").each((function(t,e){t.dispose()})),Stylect.convertSelects())}});Object.append(MultiColumnWizard,{operationLoadCallbacks:{},operationClickCallbacks:{},operationUpdateCallbacks:{},addOperationLoadCallback:function(t,e){MultiColumnWizard.operationLoadCallbacks[t]||(MultiColumnWizard.operationLoadCallbacks[t]=[]),MultiColumnWizard.operationLoadCallbacks[t].include(e)},addOperationUpdateCallback:function(t,e){MultiColumnWizard.operationUpdateCallbacks[t]||(MultiColumnWizard.operationUpdateCallbacks[t]=[]),MultiColumnWizard.operationUpdateCallbacks[t].include(e)},addOperationClickCallback:function(t,e){MultiColumnWizard.operationClickCallbacks[t]||(MultiColumnWizard.operationClickCallbacks[t]=[]),MultiColumnWizard.operationClickCallbacks[t].include(e)},insertNewElement:function(t,e){if(!0!==this.asyncBlock){this.asyncBlock=!0,t.addClass("rotate");for(var a=$(e).getParent(".tl_modulewizard.multicolumnwizard"),n=$(a).getAttribute("data-name"),i=$(a).getElements("tr"),l=0,o=0;o<i.length;o++)l=Math.max(l,$(i[o]).getAttribute("data-rowid"));var r=this;new Request.Contao({evalScripts:!1,onSuccess:function(a,n){t.removeClass("rotate");var i=new Element("div",{html:n.content}),l=$(i).getElement("tr");l.inject(e,"after"),n.javascript&&Browser.exec(n.javascript),l.getElements("td.operations a").each((function(e){var a=e.get("data-operations");MultiColumnWizard.operationLoadCallbacks[a]&&MultiColumnWizard.operationLoadCallbacks[a].each((function(a){a.pass([e,t],r)()})),r.operationLoadCallbacks[a]&&r.operationLoadCallbacks[a].each((function(a){a.pass([e,t],r)()}))})),void 0!==Elements.chosen&&l.getElements("select.tl_chosen").chosen(),r.updateOperations(),r.asyncBlock=!1},onFailure:function(e){t.removeClass("rotate"),r.asyncBlock=!1}}).post({action:"mcwCreateNewRow",name:n,maxRowId:l,REQUEST_TOKEN:Contao.request_token})}},newUpdate:function(t,e){var a=e.getSiblings().length+1;this.options.maxCount>0&&a>=this.options.maxCount?t.setStyle("display","none"):t.setStyle("display","inline")},copyNewElement:function(t,e){if(!0===this.asyncBlock)return;this.asyncBlock=!0,t.addClass("rotate");let a=new Element("form");$(a).set("html",$(e).get("html"));let n=$(a).toQueryString().parseQueryString(),i=$(e).getParent(".tl_modulewizard.multicolumnwizard"),l=$(i).getAttribute("data-name"),o=$(i).getElements("tr"),r=0;for(let t=0;t<o.length;t++)r=Math.max(r,$(o[t]).getAttribute("data-rowid"));n.action="mcwCopyNewRow",n.name=l,n.maxRowId=r,n.REQUEST_TOKEN=Contao.request_token;let s=this;new Request.Contao({evalScripts:!1,onSuccess:function(a,n){t.removeClass("rotate");let i=new Element("div",{html:n.content}),l=$(i).getElement("tr");l.inject(e,"after"),n.javascript&&Browser.exec(n.javascript),l.getElements("td.operations a").each((function(e){let a=e.get("data-operations");MultiColumnWizard.operationLoadCallbacks[a]&&MultiColumnWizard.operationLoadCallbacks[a].each((function(a){a.pass([e,t],s)()})),MultiColumnWizard.operationLoadCallbacks[a]&&MultiColumnWizard.operationLoadCallbacks[a].each((function(a){a.pass([e,t],s)()}))})),void 0!==Elements.chosen&&l.getElements("select.tl_chosen").chosen(),s.updateOperations(),s.asyncBlock=!1},onFailure:function(e){t.removeClass("rotate"),s.asyncBlock=!1}}).post(n)},copyUpdate:function(t,e){var a=e.getSiblings().length+1;this.options.maxCount>0&&a>=this.options.maxCount?t.setStyle("display","none"):t.setStyle("display","inline")},copyClick:function(t,e){this.killAllTinyMCE(t,e);var a=e.getSiblings().length+1;if(0==this.options.maxCount||this.options.maxCount>0&&a<this.options.maxCount){var n=e.clone(!0,!0);level=e.getAllPrevious().length,(n=this.updateRowAttributes(++level,n)).inject(e,"after"),n.getElements("a[data-operations]").each((function(t){$$(t).set("title",$$(t).getElement("img").get("alt")),new Tips.Contao($$(t).filter((function(t){return""!=t.title})),{offset:{x:0,y:26}})})),n.getElements("script").length>0&&n.getElements("script").each((function(t){Browser.exec(t.get("html"))}));var i=this;n.getAllNext().each((function(t){i.updateRowAttributes(++level,t)}))}this.reinitTinyMCE(t,e,!1),this.reinitStylect()},deleteUpdate:function(t,e){var a=e.getSiblings().length+1;this.options.minCount>0&&a<=this.options.minCount?t.setStyle("display","none"):t.setStyle("display","inline")},deleteClick:function(t,e){e.getParent(".multicolumnwizard");if(e.getSiblings().length>0){e.getAllNext();level=e.getAllPrevious().length,e.dispose(),e.destroy.delay(10,e)}},upClick:function(t,e){this.killAllTinyMCE(t,e);var a=e.getPrevious();if(a){var n=a.getAllPrevious().length;a=this.updateRowAttributes(99999,a),e=this.updateRowAttributes(n,e),a=this.updateRowAttributes(n+1,a),e.inject(a,"before")}this.reinitTinyMCE(t,e,!1)},downClick:function(t,e){this.killAllTinyMCE(t,e);var a=e.getNext();if(a){var n=e.getAllPrevious().length;e=this.updateRowAttributes(99999,e),a=this.updateRowAttributes(n,a),(e=this.updateRowAttributes(n+1,e)).inject(a,"after")}this.reinitTinyMCE(t,e,!1)},clearElementValue:function(t){"checkbox"==t.get("type")||"radio"==t.get("type")?t.checked=!1:t.set("value","")}}),MultiColumnWizard.addOperationUpdateCallback("new",MultiColumnWizard.newUpdate),MultiColumnWizard.addOperationClickCallback("new",MultiColumnWizard.insertNewElement),MultiColumnWizard.addOperationUpdateCallback("copy",MultiColumnWizard.copyUpdate),MultiColumnWizard.addOperationClickCallback("copy",MultiColumnWizard.copyNewElement),MultiColumnWizard.addOperationUpdateCallback("delete",MultiColumnWizard.deleteUpdate),MultiColumnWizard.addOperationClickCallback("delete",MultiColumnWizard.deleteClick),MultiColumnWizard.addOperationClickCallback("up",MultiColumnWizard.upClick),MultiColumnWizard.addOperationClickCallback("down",MultiColumnWizard.downClick),function(t){t&&(t.openModalSelectorOriginal=t.openModalSelector,t.openModalSelector=function(e){t.openModalSelectorOriginal(e);var a=null,n=60,i=new URI(e.url).getData("field")+"_parent",l=setInterval((function(){n-=1;for(var t=window.frames,o=0;o<t.length;o++)if("simple-modal-iframe"==t[o].name){a=t[o];break}if(a&&a.document.getElementById(i))return a.document.getElementById(i).set("id",e.id+"_parent"),void clearInterval(l);n<=0&&clearInterval(l)}),500)})}(window.Backend),versionCompare=function(t){var e=$("top").get("class").match(/version_[^\s]*/);if("string"!=typeof(e=(e=(e=e[0]).replace("version_","")).split("-").join(".")))return!1;if(typeof t+typeof e!="stringstring")return!1;for(var a=t.split("."),n=e.split("."),i=0,l=Math.max(a.length,n.length);i<l;i++){if(a[i]&&!n[i]&&parseInt(a[i])>0||parseInt(a[i])>parseInt(n[i]))return 1;if(n[i]&&!a[i]&&parseInt(n[i])>0||parseInt(a[i])<parseInt(n[i]))return-1}return 0};
//# sourceMappingURL=multicolumnwizard_be.js.map