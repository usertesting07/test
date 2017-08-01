$(document).ready(function(){


    var width = $(window).width();
    var numCols = Math.floor((width/252));

    var topics = ["food", "home", "beauty", "travel", "style", "art", "food", "home", "beauty", "style", "travel", "art"]
    var topicCounts = {
        food : 4,
        home: 4,
        beauty: 4,
        style: 4,
        travel: 4,
        art: 4
    }


    var topicTitles = ["Try new recipes", "Fix up your home", "Learn beauty tricks", "Plan your next trip", "Refine your style", "Find artistic inspiration",  
    "Improve your design skills", "Grow a garden", "Get in shape", "Celebrate with an event", "Find ideas for kids", "Learn about animals"]
    var beautySubtopics = ["Braids", "Makeup", "Hairstyles", "Piercings", "Braids", "Nails"]
    var foodSubtopics = ["Drink recipes", "Healthy recipes", "Grilling", "Healthy snacks", "Desserts", "Cocktail recipes"]
    var homeSubtopics = ["Living room ideas", "DIY home decor", "Furniture", "Backyard ideas", "Urban gardening", "Bedroom ideas"]
    var travelSubtopics = ["Travel", "Camping", "Nature", "Cities"]
    var artSubtopics = ["Art", "Design", "Photography", "Drawings"]
    var styleSubtopics = ["Casual outfits", "Dresses", "Shoes", "Prom dresses", "Street style", "Fashion"]

    var colorTints = ["rgba(241,53,53,0.8)", "rgba(226,120,13,0.8)", "rgba(250,185,4,0.8)", "rgba(15,165,115,0.8)", "rgba(0,132,255,0.8)", "rgba(180,105,235,0.8)"]

    var subtopicTitles = {
        food : foodSubtopics,
        home: homeSubtopics,
        beauty: beautySubtopics,
        style: styleSubtopics,
        travel: travelSubtopics,
        art: artSubtopics
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var getColumn = function (i) {
        var colNum = i%($(".col").length);
        return $($(".col")[colNum])
    }


    var createTopicParent = function (topicName) {
        var $topicParent = $(document.createElement("div")).addClass("topicParent");
        $topicParent.attr("id",topicName);
        var $topic = $(document.createElement("div")).addClass("topic");

        $topic.css("background-image", "url('img/pinnerstories/"+topicName+".JPG')");

        var $topicText = $(document.createElement("div")).addClass("topicText");
        title = topicTitles[i%6]
        $topicText.text(title)
        $topic.append($topicText)

        var $mask = $(document.createElement("div")).addClass("mask");
        // $mask.css("background-color", colorTints[i%6]);
        var $checkmark = $(document.createElement("div")).addClass("checkmark")
        $mask.append($topicText.clone())
        $mask.append($checkmark)
        $topic.append($mask);

        var $column = getColumn(i);
        $topicParent.append($topic);
        $column.append($topicParent);
        return $topicParent;
    }

    var createSubtopic = function (topic, i) {
        var $subtopic = $(document.createElement("div")).addClass("subtopic");
        $subtopic.css({
            "background-image" : "url('img/subtopics/"+topic.id+"/"+i+".JPG')",
            "margin-left" : ""+(12*(i%2))+"px"
        });

        var $subtopicText = $(document.createElement("div")).addClass("subtopicText");
        var titleArray = subtopicTitles[""+topic.id]
        title = titleArray[i]
        $subtopicText.text(title)
        $subtopic.append($subtopicText)

        var $subtopicMask = $(document.createElement("div")).addClass("subtopicMask");
        var $checkmark = $(document.createElement("div")).addClass("smallCheckmark")

        $subtopicMask.append($subtopicText.clone())
        $subtopicMask.append($checkmark)

        $subtopic.append($subtopicMask)

        $subtopic.click(function(evt) {
            evt.stopPropagation();
            var $maskLayer = $(evt.target).closest(".subtopicMask");
            if ($maskLayer.hasClass("selected")) {
                $maskLayer.removeClass("selected")
            } else {
                $maskLayer.addClass("selected");
            }
        })

        setTimeout(function () {
            $subtopic.addClass("appear");
        }, 25*i);
        return $subtopic
    }

    var addSubtopics = function (topic) {
        var $subtopics = $(document.createElement("div")).addClass("subtopics");
        $subtopics.css("max-height",""+(((topicCounts[topic.id]/2)*124)-12)+"px")

        for (i=0; i<topicCounts[topic.id]; i++) {
            var $subtopic = createSubtopic(topic, i);
            $subtopics.append($subtopic)
            $(topic).closest('.topicParent').append($subtopics);
        }
    }

    var isSubTopicSelected = function (topicParent) {
        masks = topicParent.find(".subtopicMask");
        for (var i=0; i<4; i++) {
            console.log(masks[i])
            if ($(masks[i]).hasClass("selected")) {
                console.log("is selected")
                return true;
            }
        }
        return false
    }

    var loadTopics = function () {
        for (i=0; i<21; i++) {
            $topicParent = createTopicParent(topics[i%6])

            $topicParent.click(function(evt) {
                var $this = $(this);
                if ($this.hasClass("selected")) {

                    if (isSubTopicSelected($this)) {
                        if ($this.hasClass("uncheck")) {
                            $this.removeClass("uncheck")
                        } else {
                            $this.addClass("uncheck");
                        }
                    } else {
                        $this.removeClass("selected");
                        $this.removeClass("uncheck");
                        $this.addClass("disappear")
                        setTimeout(function () {
                            $($this.find('.subtopics')).remove()
                        }, 450);

                    }

                } else {
                    $this.addClass("selected");
                    $this.removeClass("disappear")
                    addSubtopics(this);
                }
            });
        };

        $('.tp').addClass('show')
    }

    setTimeout(function() {
        loadTopics();
    },1000)


})




