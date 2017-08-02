$(document).ready(function(){

    var count = 0
    var width = $(window).width();
    var numCols = Math.floor((width/252));

    var topics = ["food", "home", "style", "beauty", "diy", "design", "travel", "gardening", "art", "wedding", "outdoors", "animals"]

    var topicTitles = ["Try new recipes", 
        "Spruce up your home", 
        "Explore your style", 
        "Learn beauty tricks", 
        "Do it all yourself",
        "Get design inspiration", 
        "Plan your next trip",
        "Work your green thumb", 
        "Find your inner artist",
        "Plan a wedding", 
        "Find outdoor adventures", 
        "See cute animals"]
    var beautySubtopics = ["Hair & beauty", "Hairstyles", "Braids", "Makeup", "Nails"]
    var foodSubtopics = ["Food and drink", "Healthy recipes", "Grilling", "Healthy snacks", "Desserts", "Cocktail recipes"]
    var homeSubtopics = ["Living room ideas", "DIY home decor", "Furniture", "Backyard ideas", "Urban gardening", "Bedroom ideas"]
    var styleSubtopics = ["Women's fashion", "Dresses", "Shoes", "Prom dresses", "Street style", "Fashion"]
    var travelSubtopics = ["Travel", "Budget travel", "Roadtrips", "Adventure travel", "Romantic travel"]
    var artSubtopics = ["Art", "Paintings", "Drawings", "Illustrations", "Street art"]
    var diySubtopics = ["DIY crafts", "Crafts", "Craft organization", "Cross-stitching", "Sewing"]
    var designSubtopics = ["Design", "Graphic design", "Industrial design", "Web design", "Typography"]
    var gardeningSubtopics = ["Gardening", "Flowers", "Urban gardening", "Landscaping", "Container gardening"]
    var weddingSubtopics = ["Weddings", "Wedding dresses", "Wedding photography", "Bridesmaid dresses", "Romantic weddings"]
    var outdoorsSubtopics = ["Outdoors", "Backpacking", "Canoeing", "hiking", "Roadbiking"]
    var animalsSubtopics = ["Animals", "Dogs", "Cats", "Cute animals", "Wild animals"]

    var colorTints = ["rgba(241,53,53,0.8)", "rgba(226,120,13,0.8)", "rgba(250,185,4,0.8)", "rgba(15,165,115,0.8)", "rgba(0,132,255,0.8)", "rgba(180,105,235,0.8)"]


    var subtopicTitles = {
        food : foodSubtopics,
        home: homeSubtopics,
        beauty: beautySubtopics,
        style: styleSubtopics,
        travel: travelSubtopics,
        art: artSubtopics,
        diy: diySubtopics,
        design: designSubtopics,
        gardening: gardeningSubtopics,
        wedding: weddingSubtopics,
        outdoors: outdoorsSubtopics,
        animals: animalsSubtopics
    }

    function updateCount(count) {
        if (count >=5) {
            $(".next").addClass("active")
        } else if (count < 5) {
            $(".next").removeClass("active")
        }
        if ((5-count) <= 0) {
            $(".next-copy").text("Continue");
        } else {
            $(".next-copy").text("Follow "+(5-count)+" more");
        }
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
        var $topicName = $(document.createElement("div")).addClass("topicName");
        $topicName.text(topicTitles[i])
        $topicParent.append($topicName)

        $subtopics = addSubtopics($topicParent[0])
        $topicParent.append($subtopics)



        $(".picker").append($topicParent);
        return $topicParent;

    }

    var createSubtopic = function (topicParent, j) {
        var $subtopic = $(document.createElement("div")).addClass("subtopic");
        $subtopic.css({
            "background-image" : "url('img/subtopics/"+topicParent.id+"/"+j+".jpg')",
        });

        var $subtopicText = $(document.createElement("div")).addClass("subtopicText");
        var titleArray = subtopicTitles[""+topicParent.id]
        title = titleArray[j]
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
                count = count-1;
                $maskLayer.removeClass("selected")
            } else {
                count = count+1;
                $maskLayer.addClass("selected");
            }
            updateCount(count);

        })

        return $subtopic
    }

    var addSubtopics = function (topicParent) {
        // console.log(topicParent.id)

        var $subtopics = $(document.createElement("div")).addClass("subtopics");
        for (j=0; j<5; j++) {
            console.log(topicParent.id, j)
            var $subtopic = createSubtopic(topicParent, j);
            $subtopics.append($subtopic);
        }

        return $subtopics
    }

    var createUseCaseTopics = function (topicName) {
        
    }

    var loadTopics = function () {
        for (i=0; i<topics.length; i++) {
            $topicParent = createTopicParent(topics[i], i)

        };

        $('.tp').addClass('show')
    }

    setTimeout(function() {
        loadTopics();
    },1000)


})




