var dataController = (function () {


    var bookmarkLocal = {
  
    }
    
    // Public methods
    return {
        newBookmark: function (nameSite, urlSite) {
            var bookmarkArray
            
            //pushing the object data to the array
            bookmarkLocal.name = nameSite;
            bookmarkLocal.url = urlSite;

            //Storing the array data containing the object data to the local storage
            if (localStorage.getItem('bookmarkStorage') === null) {
                // initialize array
                 bookmarkArray = [];

                //store the object to the array
                bookmarkArray.push(bookmarkLocal);

                //store the array to the local storage
                newBookmark = localStorage.setItem('bookmarkStorage', JSON.stringify(bookmarkArray));

            } else  {

                //get the bookmarks from the local storage
                bookmarkArray = JSON.parse(localStorage.getItem('bookmarkStorage'));
                
                //add bookmark to the array
                bookmarkArray.push(bookmarkLocal);

                //store the new data to the local storage
                localStorage.setItem('bookmarkStorage' , JSON.stringify(bookmarkArray));
                

            }
            //get the updated bookmarks
            UIController.addListBookmark();
            
            return bookmarkArray;
        },
        deleteBookmark : function (url) {
            console.log(url);
            //get local storage from the bookmarkStorage
            var bookmarkArray = JSON.parse(localStorage.getItem('bookmarkStorage'));

            //loop through bookmarks array
            for(var i = 0; i < bookmarkArray.length ;i++){
                if(bookmarkArray[i].url == url){
                    //delete the site from the array
                    bookmarkArray.splice(i , 1);
                }
            }

            //set the new array in the storage
            localStorage.setItem('bookmarkStorage', JSON.stringify(bookmarkArray));
            //get the updated bookmark
            UIController.addListBookmark();
        },
        testFunction: function () {
            
            return console.log(bookmarkArray);
        },

        getLocalStorage : function () {
            return getBookmarkStorage;
        }
    }
})();

var UIController = (function () {
    // Public Methods
    return {
        getSiteInput: function () {
            return {
                sitename: document.querySelector('.site-name').value,
                siteURL: document.querySelector('.site-url').value
                };
            },
      
        addListBookmark: function () {
            // get bookmarks from local storage
            var bookmarkArray = JSON.parse(localStorage.getItem('bookmarkStorage'));
            //get the class of the html output tag
            var bookmarksResult = document.querySelector('.output');
            //build output
            bookmarksResult.innerHTML = '';
            for(let index = 0; index < bookmarkArray.length;index++){
                var name = bookmarkArray[index].name;
                var url = bookmarkArray[index].url;
                console.log(url);
                bookmarksResult.innerHTML += '<div class="row list-container"> ' +
                                                '<h3>'+name+ 
                                                '<a class="bookmarkBtn" href="https://'+url+'"target="_blank">Visit</a>'+
                                                '<a class="bookmarkBtn deleteBtn" onclick="dataController.deleteBookmark(\''+url+'\')" href="#" > Delete </a>'+
                                                '</h3>'+
                                            '</div>'
            }


        }   

    }
})();

var appController = (function (uiCtrl, dataCtrl) {
    var appStartEvent = function (params) {
        document.querySelector('.submitBtn').addEventListener('click', addBookmark);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                addBookmark();
            }
        });
    };

    var addBookmark = function () {
        //1 . get the site and site name input
        var bookmarkName = uiCtrl.getSiteInput();
       
        //2 . store the sites in the dataController
        dataCtrl.newBookmark(bookmarkName.sitename, bookmarkName.siteURL);
        
        //3. display the sites in the UIController
        uiCtrl.addListBookmark();



    }

    // public methods
    return {
        init: function () {
            console.log("App is running");
            appStartEvent();
        }
    }

})(UIController, dataController);
//Start application
appController.init();