# game-of-life

## Használt technológiák és verziók
- Angular CLI: 1.6.7
- Angular: 5.2.10
- Node: v6.10.3
- yarn: 1.5.1
- mongo: 3.6.0
- mocha: 5.1.1
- Docker: 17.12.0-ce
- Docker-compose: 1.18.0

# Build
A projekt gyökér mappájában lévő `./build.sh` script futtatásával lehet buildelni a projectet. A script telepíti a backend, illetve a frontend függőségeket, majd buildeli a frontend kódot, végül pedig készít egy docker image-t a következő néven: `game-of-life:latest`

# Alkalmazás futtatása
A sikeres build után a `docker-compose up -d` paranccsal lehet indítani az alkalmazást, amely elindít egy mongo adatbázist az alkalmazás számára, majd elindítja a Build szekcióban készített containert is.
Ezután a `http://localhots:3000` címen érhető el az alkalmazás

#  .lif file parser
A backend alkalmazáshoz volume-ként csatolva van a projekt gyökerében lévő `resources` mappa. Ebbe a mappába bemásolhatóak, illetve eltávolíthatóak a .lif file-ok. A file-okat futás időben is lehet változtatni.

# Adatbázis fileok
Az adatbázishoz szükséges file-ok a projekt gyökerében lévő `data` könyvtár tárolja, így a container újraindítását követően is elérhetőek maradnak a mentett minták.

# Backend testek futtatás
A backend mappában a `npm run test-unit` paranccsal lehet futtatni a test fileokat

# Felület használata
Az alkalmazás betöltését követően egy 30x30-as board-al indul. Ekkor minden cella kék, azaz 'halott'. 
A következő lehetőségek elérhetőek:
 - Cellákat 'élővé' lehet tenni, a cellán való kattintással (a piros cella az 'élő')
 - Board átméretezése: 10x10-estől a 100x100-as méretig van lehetőség a board méretét megadni a `Type board size`  feliratú input mező segítségével
 - Minták betöltése: Lehetőség van korábban elmentett vagy a `resources` mappában lévő file-ok betöltésére a `Choose pattern`  feliratú dropdown-al
 - Ha futásidőben került új minta a resources mappába, akkor a `Refresh patterns` gombbal lehet újratölteni a mintákat
 - Minta mentése: bármilyen állapotú board mentésére van lehetőség a `Save current state` gombbal. Ezt követően tetszőleges név adható, majd a `Save` gombbal menthető
 - A pálya törlésére, azaz minden mező halottá tételére a `Clear board feliratú` gomb ad lehetőséget
 - Lehetőség van automatikus lejátszásra (`Play` feliratú gomb). Ekkor 500 millisecundumonként lép az alkalmazás a következő generációra
 - Lehetőség van lépésenként lejátszani a generációkat (`Next` feliratú gomb)
 (A fenti két gomb mellett szerepel a generációk száma, ami addig számlálja a lépéseket, míg nem változik meg egy cella állapota a felhasználó által `Step count`)