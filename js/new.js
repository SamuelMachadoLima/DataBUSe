$(".show-more a").on("click", function() {
    var $this = $(this); 
    var $content = $this.parent().prev().prev("div.novidade");
    var linkText = $this.text().toUpperCase();
    
    if(linkText === "LER MAIS"){
        linkText = "Ler menos";
        $content.switchClass("hideContent", "showContent", 400);
    } else {
        linkText = "Ler mais";
        $content.switchClass("showContent", "hideContent", 400);
    };

    $this.text(linkText);
    return false;
});