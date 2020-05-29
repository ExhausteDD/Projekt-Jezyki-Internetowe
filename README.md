# Filmlibrary

Filmlibrary jest aplikacją webową służącą dla zapisywania i liczenia spędzonego czasu za filmami bądź seriale. Każdy użytkownik może swobodnie zarejestrować się na stronie tylko za pomocą adresu mailowego, i w pełni korzystać z aplikacji. 

## Instalacja

- Najpierw musisz [pobrać](https://nodejs.org/en/) i zainstalować Node.js. Wraz z nim zainstaluję się manager paketów [npm](https://www.npmjs.com/), z pomocy którego dalej będziemy korzystać. 

- Następnie zainstalować globalnie Vue CLI na swoim komputerze.

Dlatego musisz w commandline wpisać następne polecenie:

```
npm install -g vue-cli
```

- Kolejnym krokiem jest pobranie plików z [repozytorium](https://github.com/ExhausteDD/Projekt-Jezyki-Internetowe) i przejście do folderu za pomocą tego z comandline: 

```
cd filmibrary
```

- Po wejściu do folderu z projektem należy zainicjalizować projekt za pomocą polecenia: 

```
npm i
```

## Uruchomienie i hot-reload dla developmentu

- Szybkie uruchomienie projektu: 

```
npm run serve
```

Po zakończeniu działania polecenia zostanie uruchomiony projekt oraz wywołany lokalny serwer, który dostępny jest pod adresem [localhost:8080](http://localhost:8080/).

## Technologie użyte w projekcie

* [Vue.js](https://vuejs.org/) - JavaScript Framework.
* [Stylus](https://stylus-lang.com/) - Dynamiczny preprocessor CSS.
* [Uimini](https://uimini.vedees.ru/) - CSS biblioteka oparta o flexbox.
* [Animate.css](https://animate.style/) - CSS biblioteka służąca dla łatwego korzystania z css animacji. 
* [Firebase](https://firebase.google.com/) - Użyto Realtime Database dla zapisywania danych użytkowników.
* [Vuex](https://vuex.vuejs.org/guide/) - Reaktywny storage dla trzymania danych o stanie aplikacji.
* [Vue Router](https://router.vuejs.org/) - Biblioteka Vue wspomagająca tworzeniu nawigacji aplikacji opartej o Vue.
* [Vue](https://vuelidate.js.org/) - Biblioteka wspomagająca latwe tworzenie validacji danych we Vue, a szczególnie w projekcie szkorzystano z pomocy dla walidacji form. 

## Aplikacja w żeczywistości 

[https://film-library-e9532.web.app/](https://film-library-e9532.web.app/registration)