function getStores() {


    fetch('/api/stores')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (storeData) {
                    console.log(storeData);
                    console.log("------------------------------------");
                    var storeList = $("#storeList");
                    storeList.empty();

                    for (var i = 0; i < storeData.length; i++) {
                        // Then display the fields in the HTML
                        var listItem = $("<li class='list-group-item mt-4'>");

                        var buttonStatusClass;

                        if (storeData[i].status === 'open') {
                            buttonStatusClass = "btn-success";
                        }
                        else {
                            buttonStatusClass = "btn-danger";
                        }

                        var openCloseBtn = $("<button class='btn openCloseButton'>");
                        openCloseBtn.addClass(buttonStatusClass);

                        openCloseBtn.attr("data-store-id", storeData[i].storeID);
                        openCloseBtn.attr("data-status", storeData[i].status);
                        openCloseBtn.html(storeData[i].status);

                        var store = $("<div>");
                        store.append(`<h3><a href="/store/${storeData[i].storeID}">${storeData[i].storeName}</a></h3>`);
                        store.append("<h4><i>" + storeData[i].storeDescription + "</i></h4>");
                        store.append(openCloseBtn);
                        store.append("<hr>");

                        storeList.append(store);

                    }


                });
            }
        )
}

$(document).on("click", ".openCloseButton", function () {

    var storeID = $(this).data("store-id");
    var status = $(this).data("status");

    var storeUpdate = {
        storeID: storeID,
        status: status
    };

    fetch('/api/storeupdate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeUpdate),
    })
        .then((res) => res.json())

        .then((storeUpdate) => {

            //data = true
            console.log(storeUpdate)

            getStores();
        });

});


//Get Stores on Load of the Page
getStores();
