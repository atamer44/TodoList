
// html sayfanda bir todo girin inputun var buraya todo yazıp butonlayıp todoyu asagıda listele ve hepsini sil butonunla dizayn et

// ilk amacın şu: todoları alacaksın ul nin içine li olarak dinamik basacaksın...




                             //Adım 1: ben elementleri ilk başta bir seçeyim...

// todo yu eklemek için ilk başta bir form'u seç...

const form = document.querySelector("#todo-form");

//bir todo girin yazan inputu seç,burdaki degeri sen alıp li ye ekleyeceksin çünkü..

const todoInput =document.querySelector("#todo");

//sen bu todolaru ul etiketine ekleyeceksin o zaman ul leri de seçelim gel..classı da list-group bu ul nin

const todoList = document.querySelector(".list-group");

// sonra cartımızı seçelim bunun altına bir tane alert ekleyecegiz 2 tane cartım var ilkini seçecegim ,firs cadbede adında

const firstCardBody = document.querySelectorAll(".card-body")[0];

//sonrada ikinci cardbodyumu seç :Todolar yazan yerin kapsayıcısı...

const secondCardBody = document.querySelectorAll(".card-body")[1];

//bir todo arayın yazan filter input alanınıda seçelim şimdiden ...

const filter = document.querySelector("#filter");

// Tüm taskları temizleyin yazan butonuda seçelim..

const clearButton = document.querySelector("#clear-todos");

/*Böylelikle tüm elementleri seçtim ilk adımım bu olsun... */



                //Adım 2 : amaç ne todo eklemek o zaman formumuza bir submit kazandırmamız lazım
    //yani submit oldu mu todomu al li ye ekle amacım bu...
    //bak şimdi bu eventleri kapsauacagın bir fonksiyon olustur.. burda sadece eventeri ver
    //eventListener adında bir fonkisoyon olustursam burda tüm eventlerimi eklesem :
    //sayfamız yeni acıldıgında elementlerim secilecek ve hemen bu fonksiyon calısacak

 eventListener();  // ilk calısacak fonksiyon

    function eventListener(){ // tüm event listeerler bu fonksiyonda..

        //1 : formun submit oldugunda addTodo fonksiyonunu cagır.. addtodu ne todoyu ekleme 
            form.addEventListener("submit",addTodo);
            //todoları local stroden almak için sayfa ilk açıldıgında :
            document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
            //todoları silmek için olan eventim..
            secondCardBody.addEventListener("click",deleteTodo);
            //filtrelemek için event ekliyorum..
            filter.addEventListener("keyup",filterTodos);
            //tüm taskları temizle butonuna basıyorum :
            clearButton.addEventListener("click",clearAllTodos)

        




    }


    //Tüm taskları temizle butonuna basıldıgında:
    function clearAllTodos(e){
        //confirm kontrolü---ok ye nasarda true olacak ve işlemini yap
        if(confirm("Tüm Taskları Silmek İstediğizden Emin misiniz?")){
            //arayüzden todoları silme :
           // todoList.innerHTML = ""; // bu 1.yol ama yavaş bir yöntem

           //2 hızlı yol:removechilde ilk cocugu göndert:
           while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);
           }

           //localstrogeden de silelim:
           localStorage.removeItem("todos")
           

        }
    }
    //filtreleme için filterTodos fonksiyonumu yazıyorum:
      function filterTodos(e){
          const filterValue = e.target.value.toLowerCase();
          const listItems=document.querySelectorAll(".list-group-item");
          listItems.forEach(function(listItem){
              const text = listItems.textContent.toLowerCase();
              //text filtervalue kontrolü

              if(text.indexof(filterValue)===-1){
                  //bulamadı gösterme demen lazım :
                  listItem .setAttribute("style","display :none !important") //css ile oya
              }
              //bulursa:
              else{
                  listItem.setAttribute("style","display:block");
        
              }
          })
      }

    //deleteYıdı fonksiyonumu yazıyorum:
    function deleteTodo(e){
        if(e.target.className==="fa fa-remove"){
            e.target.parentElement.parentElement.remove();
            //localstrogeden silmek için :
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
            alert("seçili yer silindi")
        }


    }



    //localstrogeden todoları silme fonksiyonum:
       function deleteTodoFromStorage(deletetodo){
           let todos = getTodosFromStorage();
           todos.forEach(function(todo,index){
               if(todo===deletetodo){
                   todos.splice(index,1) //arreyden deger silebiliriz...
               }
           })
             
       localStorage.setItem("todos",JSON.stringify(todos))

       }


    //loadAllTodosToUı fonksiyonunu yazıyorum : amaç: localstrogedeki bilgileri sayfa acılınca al

      function loadAllTodosToUI() {
          // önceden yazdıgın getTodusFromStrogw fonksiyonnda dönen deger lazım bana :
          let todos = getTodosFromStorage();

          // değeri aldın şimdi bunu listeye eklemek:for each ile ekleyebilirsin :

          todos.forEach(function(todo){
            addToduUI(todo);
          })


      }

    //addTodo yu burda yazayım:
    /*ad todo : submit de refresh yapmasın diye default degerini degis e.prebiusu bunu genelde alta koy
     -- sonra benim inputtaki degerleri almam lazım...aldıgın degeri bir degiskene ata ve degeri .value ile al
      ben bu inputu zaten seçmiştim adına da todoInpıt demiştim ona git icini al ..
      trim metodu kullan ki hizalı alsın boslukları almasın  value.trim();  dersen bunun üzerine bu fonksiyonu kullan dedin

      --new toduyu aldık şimdi : bizim modullere bölmek için bir fonksiyon yazacagım..
      ben burdan aldıgın toduyu listitem olarak bu fonksiyan ekleyecegiz
      yani sayfamıza dinamik element ekleyecegiz..  addToduUI adında fonksiyon yazsam amacı arayüze şu toduyu ekle 
      ve inputtan aldgım degeri de bunun içine gönder yani newTodu..

      sonra da bu fonksiyıonun dısına bi yere addToduUI fonksiyonunu yazayı
     */

       function addTodo(e){
           const newTodo = todoInput.value.trim()

           //input boşsa alert ver ama ekleme kontrol yap:
           if(newTodo ===""){
               showAlert("danger","Lütfen bir todo girin");
               // danger yerine succes gönderirsen yesil sekilde divin olusur
               //alert("lütfen bir deger girin ")  //kolay yol.. deger boşsa.. 
           }

           else {
            addToduUI(newTodo);

            //ekle ve localstrogede ekle için bir fonksiyon:
            addTodoToStorage(newTodo);  //localstrogeye de ekleyecegim..
            //basarı ile eklendi dedirt:
            showAlert("success","Başarıyla Eklendi..")

           }

          
          


           e.preventDefault();
       }

      


       //addToduUI fonksiyonumu yazıyorum... yukarda cagırdım burda yazıyorum
       /*bu fonksiyonda bana parametre olarak newTodu seklinde string bir deger gelecek
       ve biz burda arayüze ekleme işlemlerini bu fonksiyonda yapacagız..
       bunu neden yukarda yapmadın burda yaptın.. büyük projelerde işlerini fonksiyonlara bölmek 
       daha sonra degisiklikte kolay kullanabilir olmalı diye..

       şimdi benim html de ul var ama li yok.. o zaman li yaratacak bu fonksiyon bana 
       yani dinamik olarak element üretecegiz..
       html deki örnek li yi buradada benzerini olusturalım 
       const listItem diyerek li olusturalım ..createelement fonksiyonu ile:
       li nin içinde birde link var a yani onuda olusturalım 
       a yı modifiye edelim :
       innethtml ile.. bu linkin içinde bir tane i elementide olacak

       //list-iteme de müdehale edelim biraz class name örnek olsun diye html dekini aldım

       benim listıteme todoyu eklemem gerekiyor artık :texten kastım inputun ici yani newtodu
       //bunuda textnode olarak ekleyeceksin

       textnode nasıl ekleniyordu .. cocuk oldugu icin appenchild.. documentcereatetexnıde ve bana newtodu dönecek
       listitem tamam .. kinkide ekle : appenchild olarak

       ve son olarak bu li yi neye ekleyecegim ul ye.. ul yi ben seçmiştim todolist olarak ..
       todoliste list itemi bir cocugu olarak eklemem lazım artık
       
       */

       function addToduUI(newTodo){  // aldıgı string degerini list-item olarak ekleyecek yani ul nin lisi olacak
             //list-item olusturma
        const listItem  = document.createElement("li");   // listitem adında li elementlerim olusuyor
              //link olusturma ve modifiye
        const link = document.createElement("a");  // linkimide olusturdum 
        link.href ="#";
        link.className="delete-item";
        link.innerHTML = "<i class = 'fa fa-remove'></i>"  //link içine html tagi koydum

        listItem.className="list-group-item d-flex justify-content-between";

        //textnode ekleme: texnode bir element gibi..

        listItem.appendChild(document.createTextNode(newTodo));  // gelen yazıyı ekliyorum 
        listItem.appendChild(link);  // a de li nini cocugu ekle..

        //ve todoliste yani ul ye bu liyi yani list itemi ekle artık:
        todoList.appendChild(listItem);

        //ekleme bitince todoinputun valusunu da temizle bari:extra :)

        todoInput.value = " ";  //boş string

        

       }

        //showAlerti de olusturayım ...bilgilendirme mesajı için
        function showAlert(type,message){
            const alert = document.createElement("div");

            //classnameye göre alert vereceksin:
              alert.className = `alert alert- $(type)`;

              //messege verelim:
              alert.textContent= message; //texconteni mesaja eşledim

              //alerti ekleyelim :
              firstCardBody.appendChild(alert)

              //bu mesaj yazdı ama orda kalmason belirli süre sonra gitsin silinsin
              // window objende sittemioot metodu kullan süresini ver 
              // bu settimoaut 2 deger alıyor bir fonksiyon ,digeri ne zaman calısacak

              setTimeout(function(){alert.remove()},1000)

              


        }

        //LocalStroge eklemek için cagırdıgım fonksiyonun içerigi:
        function getTodosFromStorage(){ //strpgedan tüm toduları alma 
            let todos;
            if(localStorage.getItem("todos")===null){
                todos = []
            }
    
            else{
                todos= JSON.parse(localStorage.getItem("todos"));
            }
            return todos

        }


        function addTodoToStorage(newTodo){
        let todos = getTodosFromStorage(); //yukardaki fonksiyonu cagırdım

        //bize gönderilen stringi eklememiz gerekiyor:
        todos.push(newTodo);

        //artık bizim burdaki degeri güncellemiz gerekiyor...
        //KEYİMİZİ VER.. todos.. ve arrayleri stringe cevirmek icin json.strinfy degeeride
        //ordan aldıgın todusu buraya gönder..

        localStorage.setItem("todos",JSON.stringify(todos))
      


        }

       /*Ben hiç bir todo girmedim ama butona bastım.. boş todoyu ekledi...
       bu böyle olmamalı yani inputum boş ise eklemesin bunun için de bir alert
       vermen lazım...
       onun için de addtodu fonkisiyonun yani toduyu ekledigin fonksiyona bir kontrol cekmen lazım
       o fonklsiyona gidip bir if ile kontrol çek.. 
       if(newTodo === " " )  ---> yani newtodu degeri boş ise showAlert() fonklsiyonu calısacak
       yada hiç gerek yok dersen alert("bir deger girin ") de default alert calıssın..

       yok degilse else düşer  o zaman ekleme işlemini yap..
       
       bu mesaj kutusunu da bootsrepten ver.. daha şık olsun...
       html de bootsrept4 entegre.. o zaman bottrepin alertinide kullanabilirsin 
       gittim botsrep alert sayfasına ...
       şu html parcacıgını kopyaladım:
       <div class="alert alert-danger" role="alert">
                This is a danger alert—check it out!
           </div>

          bunları hangi fonksiyon yapacak showalert fonksiyonun...
          şimdi bu fonklsiyon 2 parametre alacak birincisi type i.. yani succes mi..
          danger mi.. diger parametrem ne alertimizde ne yazacak...

          olay şu:
          showAlert(type,message)  ---> type ve mesaggeyı bu fonksiyona gönderecegiz

          hata durumunda danger olacak yani:ve ne yazacak onu ver..

          showAlert("danger","lütfen bir todo girin ")

          ve ben daha sonrada bu showalerti olusturacagım henüz fonklsiyon ne yapacak belli degil..

          UYGUN BİR YERE : burda ben bir tip bir messaga almıstım parametrelerim bu

          function showAlert(type,message){
              //burda artık bir div olustur.. yani ikaz verecegin divi olustur
              const alert = document.createElement("div");  div olusturacagım

              // typimiz danger de olabilir,succesde buna göre bir clasname vereceksin

              //bebtik ile yapalım gel:

              alert.ClassName = `alert alert-$(type)`;

              // şimdi de yazımı ekle yani message parametenden ...

              alert.textcontet = messega ; //mesajımı buraya eşitleyebilirim
          }

       //şimdi sen bu alerti olusturdun bunu card mıza eklememiz lazım ...

       önceden secmiştik cardımızı: firstcardbody diye..
       o zaman bunu alta bir cocuk olarak ekleriz
       o zaman fonklsiyomıa diyorum ki:
       firstcardBody. appenchald(alert)
       ve olusturdugum alerti buraya ekleyecegim..

       ekledin iyide alert kaldı ekranda: ben istiyoum ki o alert belirli bir süre
       gözüksün ve sonra yokolsun gitsin: burdada window objelerinden biri olan
       sittimeout fonklsiyonu devreye girebilir.. bu fonklsiyon 2 parametre alır
       birisi fonksiyon, digeri bu fonksiyon ne zaman çalışsın ..
       remove fonksiyonum calıssın ama 2 saniye sonra .. ama settimeout icinde
       fonklsiyonda:

       setTimeout(function(){alert.remove();},2000)  // emsal  saniye sonra calısacak 

       
       */





       /*Peki ben bu todularımı yazıyorum da bunları local stroge nasıl eklerim.....
       
         --todoyu olusturdugun yere yani newtodu ya ki burda else de ekrana yazdırıyordun
         tamda buraya ben : addToduToStroge adında bir fonksiyon yazsam ve içine newtoduu göndersem:

         ve tabi sonrada bu fonksiyonun içerigini yaz: fonksiyonları ayrı yazıyordun
         tenha bir yerde yaz.. orda zaten cagırdın..

          function addToduToStroge(newTodo)  ---> burda bana bir tane todo gelecek

          burada ne yapacagım:
          ilk başta let todos;  degiskenimi olusturdum
          sonrada burda bir kontrol cekecegim...
          //localstroge.getıtem da todos seklinde bir key var mı controlü yapacaksın :
          eğer bu key yoksa bize null bir obje dönecek
          yani ilkbasta bizim todos arrayimiz yoksa:todos arrayimizi bos bir sekilde baslatacagız

          if(localStorage.getİtem("todos")===null){
              todos =[];
          }

          //ancak bu degerin varsa bu degeri alman gerekiyor .. else durumu
          localstroge.getItem("todos") diyerek alman gerekiyor..

          else{
              todos=localStroge.getItem("todos")
          }


          //ancak bu elsedeki "todos" string olarak gelecek...
          benim bunu arreye cevirmem lazımmıs...
          onun içinde bunu JSON.parse fonksiyonunun içine alup arreye ceviriyorum


        todos= JSON.parse(localStorage.getItem("todos"));  OLDU...
          
       
       artık biz bu arreyimize sahip... eğer varsa biz bu arrayimizi alıyoruz
       yoksa da boş bir şekilde balatıyoruz...


       ben bu kodu cogu yerde kullanacagım için bunu fonksiyon haline getireyim...

       //ŞUNU YAPAYIM,AYNISINI YAPSIN VE BANA return ile dönsün
       function addTodoToStorage(new todo){
   let todos;
        if(localStorage.getItem("todos")===null){
            todos = []
        }

        else{
            todos= JSON.parse(localStorage.getItem("todos"));
        }
        return

       }
       
       */